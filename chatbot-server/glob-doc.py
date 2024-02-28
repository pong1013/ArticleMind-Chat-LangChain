import os


path = "./docs/"

# Load md file
md_files = []
for subdir, dirs, files in os.walk(path):
    for file in files:
        if file.endswith(".md"):
            filepath = os.path.join(subdir, file)
            md_files.append(filepath)

# Sort md file paths by file namd
md_files.sort()

# Merge docs
with open("all-doc.md", "w") as docs:
    for file_path in md_files:
        with open(file_path, "r") as file:
            docs.write(file.read())


# Preprocessing
with open("all-doc.md") as f:
    content = f.read()

modified_content = content.replace("\n\n\n\n\n\n", "\n")

with open("all-doc.md", "w") as file:
    file.write(modified_content)
