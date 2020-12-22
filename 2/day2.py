
from copy import copy

class IntCode:
    def __init__(self, memory, noun=None, verb=None):
        if noun and verb:
            memory[1] = noun
            memory[2] = verb
        self.set_memory(memory)

    def set_memory(self, memory):
        self.memory = memory

    def run(self):
        for ip in range(0, len(self.memory), 4):
            instruction = self.memory[ip]

            p1 = self.memory[ip+1]
            p2 = self.memory[ip+2]
            p3 = self.memory[ip+3]

            if instruction == 1:
                self.memory[p3] = self.memory[p1] + self.memory[p2]
            elif instruction == 2:
                self.memory[p3] = self.memory[p1] * self.memory[p2]
            elif instruction == 99:
                yield self.memory[0]
                break
            else:
                print('Syntax error')
                return

        return 0


with open('./input.txt') as f:
    memory = [int(i) for i in f.read().split(',')]


def part1():
    cpu = IntCode(copy(memory))
    for output in cpu.run():
        return output

print(part1())


def part2():
    target = 19690720
    for noun in range(0, 100):
        for verb in range(0, 100):
            cpu = IntCode(copy(memory), noun, verb)
            for output in cpu.run():
                if output == target:
                    return 100 * noun + verb

print(part2())