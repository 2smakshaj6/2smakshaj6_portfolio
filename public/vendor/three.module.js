// Three.js r158 - Minimal version for security portfolio
// This is a simplified version focusing on the features we need

export const THREE = {
    Scene: class Scene {
        constructor() {
            this.children = [];
        }
        add(object) {
            this.children.push(object);
        }
    },
    
    PerspectiveCamera: class PerspectiveCamera {
        constructor(fov, aspect, near, far) {
            this.fov = fov;
            this.aspect = aspect;
            this.near = near;
            this.far = far;
            this.position = { x: 0, y: 0, z: 0 };
            this.rotation = { x: 0, y: 0, z: 0 };
        }
        updateProjectionMatrix() {
            // Simplified projection matrix update
        }
    },
    
    WebGLRenderer: class WebGLRenderer {
        constructor(options = {}) {
            this.domElement = document.createElement('canvas');
            this.domElement.style.display = 'block';
            this.domElement.style.position = 'absolute';
            this.domElement.style.top = '0';
            this.domElement.style.left = '0';
            this.domElement.style.width = '100%';
            this.domElement.style.height = '100%';
            this.domElement.style.pointerEvents = 'none';
        }
        setSize(width, height) {
            this.domElement.width = width;
            this.domElement.height = height;
        }
        setClearColor(color, alpha) {
            // Simplified clear color
        }
        render(scene, camera) {
            // Simplified render - just draw a simple animation
            const ctx = this.domElement.getContext('2d');
            const time = Date.now() * 0.001;
            
            ctx.clearRect(0, 0, this.domElement.width, this.domElement.height);
            
            // Draw shield outline
            ctx.strokeStyle = `rgba(59, 130, 246, 0.3)`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            const centerX = this.domElement.width / 2;
            const centerY = this.domElement.height / 2;
            const radius = Math.min(centerX, centerY) * 0.3;
            
            // Draw hexagon shield
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3 + time * 0.1;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
            
            // Draw threat pulses
            ctx.fillStyle = `rgba(239, 68, 68, 0.6)`;
            for (let i = 0; i < 3; i++) {
                const pulseTime = time + i * 2;
                const pulseX = centerX + Math.sin(pulseTime) * radius * 1.5;
                const pulseY = centerY + Math.cos(pulseTime * 0.7) * radius * 1.5;
                const pulseSize = 3 + Math.sin(pulseTime * 2) * 2;
                
                ctx.beginPath();
                ctx.arc(pulseX, pulseY, pulseSize, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    },
    
    IcosahedronGeometry: class IcosahedronGeometry {
        constructor(radius, detail) {
            this.radius = radius;
            this.detail = detail;
        }
    },
    
    SphereGeometry: class SphereGeometry {
        constructor(radius, widthSegments, heightSegments) {
            this.radius = radius;
            this.widthSegments = widthSegments;
            this.heightSegments = heightSegments;
        }
    },
    
    MeshBasicMaterial: class MeshBasicMaterial {
        constructor(options = {}) {
            this.color = options.color || 0xffffff;
            this.wireframe = options.wireframe || false;
            this.transparent = options.transparent || false;
            this.opacity = options.opacity || 1;
        }
    },
    
    Mesh: class Mesh {
        constructor(geometry, material) {
            this.geometry = geometry;
            this.material = material;
            this.position = { x: 0, y: 0, z: 0 };
            this.rotation = { x: 0, y: 0, z: 0 };
            this.scale = { x: 1, y: 1, z: 1 };
        }
        setScalar(value) {
            this.scale.x = this.scale.y = this.scale.z = value;
        }
    }
};

// Make THREE available globally for compatibility
window.THREE = THREE;
