"""
This module modifies the content of a file by adding backticks to the math expressions.
"""

import re
import sys


def modify_file(file_path: str) -> None:
    """
    Modify the file content by adding backticks to the math expressions.

    :param file_path: The path to the file to be modified.

    :return: None
    """
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    content = re.sub(r"(?<!\\)(\\[{}])", r"\\\1", content)
    content = re.sub(r"(?<=\s)\\\\(?=\s)", r"\\\\\\\\", content)

    with open(file_path, "w", encoding="utf-8") as file:
        file.write(content)


if __name__ == "__main__":
    modify_file(sys.argv[1])
