class MyCommands:
    def echo(*args):
        return " ".join(args)

    def cat(*args):
        return "Cat is cute. Isn't it?"

    def dog(*args):
        return "Dog is cool. Isn't it?"


def execute_command(command, *args):
    ok_command = [x for x in dir(MyCommands) if not x.startswith("__")]
    # print(ok_command)
    # print(command)
    # print(*args)

    if command in ok_command:
        return getattr(MyCommands, command)(*args)
    else:
        return f'Command "{command}" is not found. Run "help" to see available commands.'


# print(execute_command(*list(input("Please input command:").split())))
