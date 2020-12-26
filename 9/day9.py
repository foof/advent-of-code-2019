
from copy import copy
from collections import defaultdict

class IntCode:
    def __init__(self, memory, input):
        self.memory = memory
        self.ip = 0
        self.input = input
        self.relative_base = 0

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


with open('./input.txt') as f:
    memory = defaultdict(int)
    for k, i in enumerate([int(i) for i in f.read().split(',')]):
        memory[k] = i


def part1():
    cpu = IntCode(copy(memory), 1)
    o = []
    for output in cpu.run():
        print(output)
        o.append(output)
    print(o)

print('Part 1')
part1()


def part2():
    cpu = IntCode(copy(memory), 2)
    o = []
    for output in cpu.run():
        print(output)
        o.append(output)
    print(o)

print('Part 2')
part2()