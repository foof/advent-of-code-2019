
from copy import copy

class IntCode:
    def __init__(self, memory, seed):
        self.memory = memory
        self.ip = 0
        self.seed = seed
    
    def parse_instruction(self, inst):
        inst = inst.rjust(5, '0')
        op = int(inst[-2:])

        mode1 = int(inst[2])
        mode2 = int(inst[1])
        mode3 = int(inst[0])

        p1, p2, p3 = self.ip+1, self.ip+2, self.ip+3
        
        p1 = self.memory[self.ip+1] if not mode1 and self.ip+1 < len(self.memory) else p1
        p2 = self.memory[self.ip+2] if not mode2 and self.ip+2 < len(self.memory) else p2
        p3 = self.memory[self.ip+3] if not mode3 and self.ip+3 < len(self.memory) else p3

        return op, p1, p2, p3

    def run(self):
        while True:
            op, p1, p2, p3 = self.parse_instruction(str(self.memory[self.ip]))

            if op == 1:
                self.memory[p3] = self.memory[p1] + self.memory[p2]
                self.ip += 4
            elif op == 2:
                self.memory[p3] = self.memory[p1] * self.memory[p2]
                self.ip += 4
            elif op == 3:
                self.memory[p1] = self.seed
                self.ip += 2
            elif op == 4:
                yield self.memory[p1]
                self.ip += 2
            elif op == 5:
                self.ip = self.memory[p2] if self.memory[p1] else self.ip + 3
            elif op == 6:
                self.ip = self.memory[p2] if not self.memory[p1] else self.ip + 3
            elif op == 7:
                self.memory[p3] = 1 if self.memory[p1] < self.memory[p2] else 0
                self.ip += 4
            elif op == 8:
                self.memory[p3] = 1 if self.memory[p1] == self.memory[p2] else 0
                self.ip += 4
            elif op == 99:
                break
            else:
                print('Unsupported operation')
                print('Exit code -1')
                return
        print('Exit code 0')
        return


with open('./input.txt') as f:
    memory = [int(i) for i in f.read().split(',')]

    
def part1():
    cpu = IntCode(copy(memory), 1)
    for output in cpu.run():
        print('output', output)

print('Part 1')
part1()


def part2():
    cpu = IntCode(copy(memory), 5)
    for output in cpu.run():
        print('output', output)

print('Part 2')
part2()