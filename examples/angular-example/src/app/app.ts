import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { DevicePostureService, ViewportSegmentsService } from '@foldable-ts/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  template: `
    <div class="app">
      <div class="info-panel">
        <h1>🅰️ Angular Foldable Demo</h1>
        <p><strong>Device Posture:</strong> <code>{{ posture() }}</code></p>
        <p><strong>Total Segments:</strong> {{ segments().length }}</p>
        
        <pre>{{ mapSegmentsForDisplay(segments()) | json }}</pre>
      </div>

      <div class="segments-container">
        @for (rect of segments(); track $index; let i = $index) {
          <div
            class="segment-visual"
            [style.left.px]="rect.left"
            [style.top.px]="rect.top"
            [style.width.px]="rect.width"
            [style.height.px]="rect.height"
          >
            Segment {{ i + 1 }}
          </div>
        }
      </div>
    </div>

    <router-outlet />
  `,
})
export class App {
  private postureService = inject(DevicePostureService);
  private segmentsService = inject(ViewportSegmentsService);

  posture = this.postureService.posture;
  segments = this.segmentsService.segments;

  mapSegmentsForDisplay(segments: DOMRect[]) {
    return segments.map(s => ({ left: s.left, top: s.top, width: s.width, height: s.height }));
  }
}