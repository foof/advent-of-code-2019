from intcode import IntCode
from collections import defaultdict
from copy import copy
from time import sleep

with open('./data') as f:
    memory = defaultdict(int)
    for k, i in enumerate([int(i) for i in f.read().strip().split(',')]):
        memory[k] = i

def part1(memory):
    cpu = IntCode(memory)
    program = cpu.run()

    tiles = {}
    max_row = 0
    max_col = 0
    typemap = {0: ' ', 1: '#', 2: '=', 3: '-', 4: 'o'}
    while True:
        try:
            x, y, type = next(program), next(program), next(program)
            tiles[(x, y)] = typemap[type]
            max_row = max(max_row, y)
            max_col = max(max_col, x)
        except StopIteration:
            break
    return max_row, max_col, tiles

max_row, max_col, tiles = part1(copy(memory))
print(max_row, max_col)
display = [[' ' for _ in range(max_col+1)] for _ in range(max_row+1)]
for tile in tiles:
    x, y = tile
    display[y][x] = tiles[(x, y)]
for row in display:
    print(''.join(row))
print(sum([1 for pos in tiles if tiles[pos] == '=']))


def part2(memory):
    memory[0] = 2
    cpu = IntCode(memory, 0)
    program = cpu.run()

    score = 0
    tile_map = {0: ' ', 1: '#', 2: '=', 3: '-', 4: 'o'}
    display = [[' ' for _ in range(42)] for _ in range(23)]
    ball_pos = (0, 0)
    paddle_pos = (0, 0)
    while True:
        try:
            x, y, value = next(program), next(program), next(program)
            if x == -1 and y == 0:
                score = value
            else:
                if value == 4:
                    ball_pos = (x, y)
                if value == 3:
                    paddle_pos = (x, y)

                if ball_pos[0] < paddle_pos[0]:
                    cpu.set_input(-1)
                elif ball_pos[0] > paddle_pos[0]:
                    cpu.set_input(1)
                else:
                    cpu.set_input(0)

                display[y][x] = tile_map[value]
                #     print(''.join(row))
                # for row in display:
        except StopIteration:
            break
    return score

score = part2(copy(memory))
print(score)