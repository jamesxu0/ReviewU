classes = open("classes", "r")
numbers = open("numbers", "r")
names = open("names", "r")
out = open("descriptions", "a")
prevNumber = -1
prevAbrev = ""
while True:
    fullClass = classes.readline()
    newNumber = numbers.readline()
    newName = names.readline()
    start = fullClass.find("(") + 1
    end = fullClass.find(")")
    newAbrev = fullClass[start:end]
    if prevAbrev == newAbrev and prevNumber == newNumber:
        continue
    if not newNumber:
        break
    out.write("\"" + newAbrev + "-" + newNumber.rstrip() +
              "\":\"" + newName.rstrip() + "\",\n")
    prevAbrev = newAbrev
    prevNumber = newNumber
out.close()
