import { Component, ElementRef, HostListener, OnInit, OnDestroy, ViewChild, NgZone } from '@angular/core';

@Component({
    selector: 'app-cursor-effect',
    standalone: true,
    template: `
    <canvas #canvas></canvas>
  `,
    styles: [`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1; /* Behind everything */
      pointer-events: none; /* Let clicks pass through */
      opacity: 0.6; /* Subtle effect */
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class CursorEffectComponent implements OnInit, OnDestroy {
    @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

    private ctx!: CanvasRenderingContext2D;
    private particles: Particle[] = [];
    private animationFrameId: number = 0;
    private mouseX = 0;
    private mouseY = 0;

    // Configuration
    private particleCount = 150; // Density
    private connectionRadius = 100; // Mouse attraction range
    private color = '#333333'; // Particle color (dark gray)

    constructor(private ngZone: NgZone) { }

    ngOnInit(): void {
        this.initCanvas();
        this.createParticles();
        this.startAnimation();
    }

    ngOnDestroy(): void {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }

    @HostListener('window:resize')
    onResize(): void {
        this.initCanvas();
        this.createParticles(); // Re-create to fit new screen
    }

    @HostListener('window:mousemove', ['$event'])
    onMouseMove(event: MouseEvent): void {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
    }

    private initCanvas(): void {
        const canvas = this.canvasRef.nativeElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.ctx = canvas.getContext('2d')!;
    }

    private createParticles(): void {
        this.particles = [];
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Adjust count based on screen size (less on mobile)
        const count = width < 768 ? 60 : this.particleCount;

        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5, // Slow float velocity
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1, // Dash length/size
                angle: Math.random() * Math.PI * 2 // Initial rotation
            });
        }
    }

    private startAnimation(): void {
        this.ngZone.runOutsideAngular(() => {
            const animate = () => {
                this.update();
                this.draw();
                this.animationFrameId = requestAnimationFrame(animate);
            };
            animate();
        });
    }

    private update(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;

        for (const p of this.particles) {
            // Basic movement
            p.x += p.vx;
            p.y += p.vy;

            // Wrap around screen
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            // Mouse Interaction (The "Antigravity" Effect)
            const dx = this.mouseX - p.x;
            const dy = this.mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // If close to mouse, attract!
            if (dist < 200) {
                // Calculate angle to face mouse
                const targetAngle = Math.atan2(dy, dx);

                // Smoothly rotate towards mouse
                // Simple lerp for rotation
                p.angle = targetAngle;

                // Accelerate towards mouse (Magnetic)
                const force = (200 - dist) / 2000; // Stronger when closer
                p.vx += dx * force * 0.05;
                p.vy += dy * force * 0.05;
            } else {
                // Friction to return to normal float speed
                p.vx *= 0.99;
                p.vy *= 0.99;
            }

            // Cap speed
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed > 4) {
                p.vx = (p.vx / speed) * 4;
                p.vy = (p.vy / speed) * 4;
            }
        }
    }

    private draw(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Clear
        this.ctx.clearRect(0, 0, width, height);

        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = this.color;

        for (const p of this.particles) {
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.angle);

            // Draw a "Dash" or "Bit" like antigravity.google
            // Size determines length
            this.ctx.beginPath();
            this.ctx.rect(-p.size * 2, -1, p.size * 4, 2); // A small rectangle/dash
            this.ctx.fill();

            this.ctx.restore();
        }
    }
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    angle: number;
}
