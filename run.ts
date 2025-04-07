export function run(...args: string[]): Deno.Command {
  return new Deno.Command("sketchybar", { args });
}
