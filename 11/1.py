
from copy import copy
from collections import defaultdict
import time

class IntCode:
    def __init__(self, memory, input=None):
        self.memory = memory
        self.ip = 0
        self.input = input
        self.relative_base = 0

    def set_input(self, input):
        self.input = input

    def get_parameter_address(self, inst, pos):
        mode = int(inst[3-pos])
        if mode == 0:
            return self.memory[self.ip+pos]
        elif mode == 1:
            return self.ip+pos
        elif mode == 2:
            return self.memory[self.ip+pos] + self.relative_base
        return None

    def parse_instruction(self, inst):
        inst = inst.rjust(5, '0')
        op = int(inst[-2:])

        pa1 = self.get_parameter_address(inst, 1)
        pa2 = self.get_parameter_address(inst, 2)
        pa3 = self.get_parameter_address(inst, 3)

        return op, pa1, pa2, pa3

    def run(self):
        while True:
            op, pa1, pa2, pa3 = self.parse_instruction(str(self.memory[self.ip]))

            if op == 1:
                self.memory[pa3] = self.memory[pa1] + self.memory[pa2]
                self.ip += 4
            elif op == 2:
                self.memory[pa3] = self.memory[pa1] * self.memory[pa2]
                self.ip += 4
            elif op == 3:
                self.memory[pa1] = self.input
                self.ip += 2
            elif op == 4:
                yield self.memory[pa1]
                self.ip += 2
            elif op == 5:
                self.ip = self.memory[pa2] if self.memory[pa1] else self.ip + 3
            elif op == 6:
                self.ip = self.memory[pa2] if not self.memory[pa1] else self.ip + 3
            elif op == 7:
                self.memory[pa3] = 1 if self.memory[pa1] < self.memory[pa2] else 0
                self.ip += 4
            elif op == 8:
                self.memory[pa3] = 1 if self.memory[pa1] == self.memory[pa2] else 0
                self.ip += 4
            elif op == 9:
                self.relative_base += self.memory[pa1]
                self.ip += 2
            elif op == 99:
                break
            else:
                print('Unsupported operation')
                print('Exit code -1')
                return
        print('Exit code 0')
        return


with open('./data') as f:
    memory = defaultdict(int)
    for k, i in enumerate([int(i) for i in f.read().strip().split(',')]):
        memory[k] = i

class EmergencyHullPaintingRobot:
    DIRECTIONS = ['up', 'right', 'down', 'left']

    def __init__(self, cpu):
        self.cpu = cpu
        self.direction = 0
        self.position = (0, 0)
        self.painted = {}

    def rotate_left(self):
        self.direction = 3 if self.direction == 0 else self.direction-1

    def rotate_right(self):
        self.direction = 0 if self.direction == 3 else self.direction+1

    def move_forward(self):
        dir = self.DIRECTIONS[self.direction]
        if dir == 'up':
            delta = (-1, 0)
        elif dir == 'right':
            delta = (0, 1)
        elif dir == 'down':
            delta = (1, 0)
        elif dir == 'left':
            delta = (0, -1)
        else:
            assert False
        self.position = tuple(map(sum, zip(self.position, delta)))

    def paint_current_panel(self, color):
        self.painted[self.position] = color

    def get_hull(self):
        min_row, max_row, min_col, max_col = self.position[0], self.position[0], self.position[1], self.position[1]
        for position in self.painted:
            min_row = min(min_row, position[0])
            max_row = max(max_row, position[0])
            min_col = min(min_col, position[1])
            max_col = max(max_col, position[1])
        row_size = max_row-min_row+1
        col_size = max_col-min_col+1
        hull = [[' ' for _ in range(col_size)] for _ in range(row_size)]
        for painted_panel in self.painted:
            if self.painted[painted_panel] == 1:
                r = painted_panel[0]-min_row
                c = painted_panel[1]-min_col
                hull[r][c] = '#'
        return hull

    def get_current_color(self):
        if self.position not in self.painted:
            return 0
        return self.painted[self.position]

    def start_painting(self):
        program_iter = self.cpu.run()

        while True:
            try:
                self.cpu.set_input(self.get_current_color())
                color_to_paint, turn = next(program_iter), next(program_iter)
                self.paint_current_panel(color_to_paint)
                if turn == 0:
                    self.rotate_left()
                else:
                    self.rotate_right()
                self.move_forward()
            except StopIteration:
                break

        print('Finished painting!')


def part1():
    robot = EmergencyHullPaintingRobot(IntCode(copy(memory)))
    robot.start_painting()
    return sum([1 for _ in robot.painted.keys()])

print(part1())


def part2():
    robot = EmergencyHullPaintingRobot(IntCode(copy(memory)))
    robot.paint_current_panel(1)
    robot.start_painting()
    return robot.get_hull()

for row in part2():
    print(' '.join(row))
