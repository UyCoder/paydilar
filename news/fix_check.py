import re
content = open('BilikGeoTool.html', encoding='utf-8').read()
scripts = list(re.finditer(r'<script[^>]*>', content))
script_ends = list(re.finditer(r'</script>', content))
last_start = scripts[-1].end()
last_end = script_ends[-1].start()
js = content[last_start:last_end]
lines = js.split('\n')
depth = 0
last_opens = []
for i, line in enumerate(lines):
    for ch in line:
        if ch == '{':
            depth += 1
            last_opens.append(i+1)
        elif ch == '}':
            depth -= 1
            if last_opens:
                last_opens.pop()
if depth != 0:
    print("Depth=" + str(depth))
    if last_opens:
        ln = last_opens[-1] - 1
        print("Last unclosed brace near JS line " + str(last_opens[-1]))
        for j in range(max(0, ln-2), min(len(lines), ln+5)):
            print(str(j+1) + ": " + lines[j][:140])
else:
    print("All braces balanced!")
