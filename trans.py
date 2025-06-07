"""
This module modifies the content of a file by adding backticks to the math expressions.
"""

import re
import sys


def process_math_blocks(content: str) -> str:
    """
    Modify the the math expressions in content.

    :param content: The content of the file.

    :return: The modified content.
    """

    def replace_in_math_block(match: re.Match) -> str:
        block = match.group(0)
        block = re.sub(r"(?<!\\)(\\[{}])", r"\\\1", block)
        block = re.sub(r"(?<!\\)(\_)", r"\\\1", block)
        block = re.sub(r"(?<!\\)(\*)", r"\\\1", block)
        block = re.sub(r"(?<!\\)(\\\#)", r"\\\1", block)
        block = re.sub(r"(?<=\s)\\\\(?=\s)", r"\\\\\\\\", block)
        block = re.sub(r"(?<!\\left)\(", r"\\left(", block)
        block = re.sub(r"(?<!\\right)\)", r"\\right)", block)
        block = re.sub(r"(?<!\\left)\\\\{", r"\\left\\\\{", block)
        block = re.sub(r"(?<!\\right)\\\\}", r"\\right\\\\}", block)
        return block

    content = re.sub(r"(\$\$.*?\$\$|\$.*?\$)",
                     replace_in_math_block,
                     content,
                     flags=re.DOTALL)
    return content


def modify_file(file_path: str) -> None:
    """
    Modify the file at the given path by adding backticks to the math expressions.

    :param file_path: The path to the file to be modified.

    :return: None
    """
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    content = process_math_blocks(content)

    with open(file_path, "w", encoding="utf-8") as file:
        file.write(content)


if __name__ == "__main__":
    modify_file(sys.argv[1])
