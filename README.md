# Mandelbrot set rendering in Conway's Game of Life

![Mandelbrot set in CGoL](img/img.png)

## Method
- Using [APGM](https://rei1024.github.io/proj/apgm/) to generate [APGSembly](https://conwaylife.com/wiki/APGsembly).
- Compiled by [APGSembly2 compiler](https://conwaylife.com/forums/viewtopic.php?p=199807#p199807).

## Files

### `mandelbrot`
- `mandelbrot_size_16_iteration_10.apgm`: APGM code
- `mandelbrot_size_16_iteration_10.apg`: APGSembly 2.0 code
- `mandelbrot_size_16_iteration_10_initial.mc.gz`: Initial pattern
- `mandelbrot_size_16_iteration_10_render_finished_gen_2.1313122e14.mc.gz`: rendered pattern at generation 2.1313122e14

### `algorithms`
- Install [Deno](https://docs.deno.com/runtime/)
- Exec `deno run --allow-net --allow-read --allow-sys jsr:@std/http@^1.0.7/file-server . -p 8080`
- Open <http://localhost:8080/algorithm/02_nonnegative/index.html>
