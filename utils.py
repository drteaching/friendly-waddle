"""Utility functions for the friendly-waddle project."""


def greet(name):
    """Return a greeting string for the given name."""
    return f"Hello, {name}!"


def is_palindrome(s):
    """Check if a string is a palindrome, ignoring case and non-alphanumeric characters."""
    cleaned = "".join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]
