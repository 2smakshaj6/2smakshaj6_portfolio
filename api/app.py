import os
import json
import time
import hashlib
import secrets
from datetime import datetime, timedelta
from flask import Flask, request, jsonify, make_response, send_from_directory, send_file
from werkzeug.exceptions import TooManyRequests

app = Flask(__name__, static_folder='../public', static_url_path='/public')

# Rate limiting storage (in-memory for serverless)
rate_limit_storage = {}

# CSRF token storage (in-memory for serverless)
csrf_tokens = {}

def generate_csrf_token():
    """Generate a CSRF token"""
    return secrets.token_urlsafe(32)

def validate_csrf_token(token, cookie_token):
    """Validate CSRF token using double-submit cookie pattern"""
    if not token or not cookie_token:
        return False
    return token == cookie_token

def check_rate_limit(ip, limit=5, window=600):
    """Check rate limit for IP address"""
    now = time.time()
    if ip not in rate_limit_storage:
        rate_limit_storage[ip] = []
    
    # Clean old requests
    rate_limit_storage[ip] = [
        req_time for req_time in rate_limit_storage[ip] 
        if now - req_time < window
    ]
    
    if len(rate_limit_storage[ip]) >= limit:
        return False
    
    rate_limit_storage[ip].append(now)
    return True

def add_security_headers(response):
    """Add security headers to response"""
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    response.headers['Permissions-Policy'] = 'camera=(), microphone=(), geolocation=()'
    response.headers['Cross-Origin-Opener-Policy'] = 'same-origin'
    response.headers['Cross-Origin-Resource-Policy'] = 'same-origin'
    return response

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    response = make_response(jsonify({"status": "ok"}))
    return add_security_headers(response)

@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submission"""
    # Rate limiting
    client_ip = request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
    if not check_rate_limit(client_ip):
        raise TooManyRequests("Rate limit exceeded")
    
    # CSRF validation
    csrf_token = request.headers.get('X-CSRF-Token')
    csrf_cookie = request.cookies.get('csrf_token')
    if not validate_csrf_token(csrf_token, csrf_cookie):
        return add_security_headers(jsonify({"error": "Invalid CSRF token"}), 403)
    
    data = request.get_json()
    
    # Validation
    if not data:
        return add_security_headers(jsonify({"error": "No data provided"}), 400)
    
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    message = data.get('message', '').strip()
    honeypot = data.get('honeypot', '')
    
    # Honeypot check
    if honeypot:
        return add_security_headers(jsonify({"error": "Bot detected"}), 400)
    
    # Length validation
    if len(name) > 100 or len(email) > 254 or len(message) > 1000:
        return add_security_headers(jsonify({"error": "Field too long"}), 400)
    
    if not name or not email or not message:
        return add_security_headers(jsonify({"error": "All fields required"}), 400)
    
    # Basic email validation
    if '@' not in email or '.' not in email.split('@')[-1]:
        return add_security_headers(jsonify({"error": "Invalid email"}), 400)
    
    # Store message (best effort to /tmp/messages.json)
    try:
        message_data = {
            'timestamp': datetime.now().isoformat(),
            'name': name,
            'email': email,
            'message': message,
            'ip': client_ip
        }
        
        messages_file = '/tmp/messages.json'
        messages = []
        
        if os.path.exists(messages_file):
            with open(messages_file, 'r') as f:
                messages = json.load(f)
        
        messages.append(message_data)
        
        with open(messages_file, 'w') as f:
            json.dump(messages, f, indent=2)
    except Exception:
        # Best effort - continue even if storage fails
        pass
    
    response = make_response(jsonify({"success": True, "message": "Message received"}))
    return add_security_headers(response)

@app.route('/api/simulate-alert', methods=['POST'])
def simulate_alert():
    """Simulate security alert triage"""
    data = request.get_json()
    
    if not data:
        return add_security_headers(jsonify({"error": "No data provided"}), 400)
    
    rule = data.get('rule', '').strip()
    log = data.get('log', '').strip()
    
    if not rule or not log:
        return add_security_headers(jsonify({"error": "Rule and log required"}), 400)
    
    # Mock triage logic
    matched = True
    tactic = "T1055"  # Process Injection
    severity = "High"
    steps = [
        "Isolate affected endpoint",
        "Collect memory dump",
        "Analyze process tree",
        "Check for persistence mechanisms",
        "Update detection rules"
    ]
    
    # Add some randomness based on input
    if "suspicious" in log.lower():
        severity = "Critical"
    elif "normal" in log.lower():
        matched = False
        tactic = "N/A"
        severity = "Info"
        steps = ["No action required"]
    
    result = {
        "matched": matched,
        "tactic": tactic,
        "severity": severity,
        "steps": steps,
        "timestamp": datetime.now().isoformat()
    }
    
    response = make_response(jsonify(result))
    return add_security_headers(response)

@app.route('/api/metrics', methods=['GET'])
def metrics():
    """Get engineering metrics"""
    # Mock metrics data
    metrics_data = {
        "builds": {
            "total": 1247,
            "success_rate": 98.2,
            "avg_duration": "2m 34s",
            "last_24h": 23
        },
        "tests": {
            "coverage": 87.3,
            "total_tests": 1842,
            "passing": 1801,
            "failing": 41
        },
        "deploy": {
            "last_deployment": "2024-01-15T14:30:00Z",
            "uptime": 99.9,
            "rollbacks": 2,
            "avg_deploy_time": "4m 12s"
        }
    }
    
    response = make_response(jsonify(metrics_data))
    return add_security_headers(response)

@app.route('/api/csrf-token', methods=['GET'])
def get_csrf_token():
    """Get CSRF token"""
    token = generate_csrf_token()
    response = make_response(jsonify({"token": token}))
    response.set_cookie('csrf_token', token, httponly=True, samesite='Strict', secure=True)
    return add_security_headers(response)

# Serve main HTML files
@app.route('/')
def index():
    """Serve main portfolio page"""
    return send_file('../index.html')

@app.route('/404.html')
def error_404():
    """Serve 404 error page"""
    return send_file('../404.html')

@app.route('/500.html')
def error_500():
    """Serve 500 error page"""
    return send_file('../500.html')

# Serve static files
@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files"""
    return send_from_directory('../', filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
