classes = open("classes", "r")
out = open("abrevs", "a")
prevClass = ""
while True:
    fullClass = classes.readline()
    if prevClass == fullClass:
        continue
    if not fullClass:
        break
    prevClass = fullClass
    start = fullClass.find("(")
    end = fullClass.find(")")
    newAbrev = fullClass[start + 1:end]
    fullName = fullClass[:start]
    out.write("\"" + newAbrev + "\":\"" + fullName.rstrip() + "\",\n")
out.close()
