import { animation, style, animate, trigger, transition, useAnimation } from '@angular/animations';

export const transitionShowing = animation([
    style({
        height: '{{ height }}',
        opacity: '{{ opacity }}',
        backgroundColor: '{{ backgroundColor }}'
      }),
      animate('{{ time }}'),
      style({
        height: '{{ height }}',
        opacity: '{{ opacity }}',
        backgroundColor: '{{ backgroundColor }}'
      })
,  animate('{{ time }}')]);