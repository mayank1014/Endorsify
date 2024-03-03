from Listofthings import PronoumsList,PositivePersonalityTraits,AcademicSkills, Phrase1, Phrase2, Phrase3, Phrase4, Phrase5, LinkingWords
from openpyxl import Workbook
from openpyxl import load_workbook
import sys, getopt
import os
import random
import datetime
from datetime import date
import docx
from docx.shared import Length, Inches, Pt
import sys
import json

doc = docx.Document('Template.docx')

all_paras = doc.paragraphs



# Access command-line argument containing the JSON string
json_string = sys.argv[1]

# Parse the JSON string into a Python object
json_object = json.loads(json_string)

# Access the JSON object's properties
print("JSON object received by Python script:")

for key, value in json_object.items():
    globals()[key] = value



pronoumLocalList = PronoumsList.get(pronoum) 
#he
subjective = pronoumLocalList[0] 
#him
objective = pronoumLocalList[1] 
#his
possessive = pronoumLocalList[2] 




###########################
#Time teacher know students
###########################

yearsAttended = schoolYearAttended.split('/') 
start_date = datetime.datetime(int(yearsAttended[0]), 8, 15) 
num_months = (date.today().year - start_date.year) * 12 + (date.today().month - start_date.month) 

if targettedInstitution == " ": 
        targettedInstitution = "your"
else :
    targettedInstitution = "the " + targettedInstitution



#Ramdomizing Academic Skills and Positive traits

academicSkillsFinal = []

acadSkill1 = random.choice(academicSkills)
academicSkills.remove(acadSkill1)
academicSkillsFinal.append(acadSkill1)
acadSkill2 = random.choice(academicSkills)
academicSkills.remove(acadSkill2)
academicSkillsFinal.append(acadSkill2)
acadSkill3 = random.choice(academicSkills)
academicSkills.remove(acadSkill3)
academicSkillsFinal.append(acadSkill3)

if len(academicSkills)>0:
    acadSkill4 = random.choice(academicSkills)
    academicSkills.remove(acadSkill4)
    academicSkillsFinal.append(acadSkill4)
    if len(academicSkills)>0:
        acadSkill5 = random.choice(academicSkills)
        academicSkills.remove(acadSkill5)
        academicSkillsFinal.append(acadSkill5)
        if len(academicSkills)>0:
            acadSkill6 = random.choice(academicSkills)
            academicSkills.remove(acadSkill6)
            academicSkillsFinal.append(acadSkill6)


positivePersonalityTraitFinal = []
personalTrait1 = random.choice(positivePersonalityTraits)
positivePersonalityTraits.remove(personalTrait1)
positivePersonalityTraitFinal.append(personalTrait1)
personalTrait2 = random.choice(positivePersonalityTraits)
positivePersonalityTraits.remove(personalTrait2)
positivePersonalityTraitFinal.append(personalTrait2)
personalTrait3 = random.choice(positivePersonalityTraits)
positivePersonalityTraits.remove(personalTrait3)
positivePersonalityTraitFinal.append(personalTrait3)

if len(positivePersonalityTraits)>0:
    personalTrait4 = random.choice(positivePersonalityTraits)
    positivePersonalityTraits.remove(personalTrait4)
    positivePersonalityTraitFinal.append(personalTrait4)
    if len(positivePersonalityTraits)>0:
        personalTrait5 = random.choice(positivePersonalityTraits)
        positivePersonalityTraits.remove(personalTrait5)
        positivePersonalityTraitFinal.append(personalTrait5)
        if len(positivePersonalityTraits)>0:
            personalTrait6 = random.choice(positivePersonalityTraits)
            positivePersonalityTraits.remove(personalTrait6)
            positivePersonalityTraitFinal.append(personalTrait6)



_space = " "

# style = doc.styles.add_style('Indent', WD_STYLE_TYPE.PARAGRAPH)
# paragraph_format = style.paragraph_format
# # paragraph_format.left_indent = Inches(0.25)
# # paragraph_format.first_line_indent = Inches(-0.25)
# paragraph_format.line_spacing_rule = Pt(10)

################
#1st Paragraph
################

doc.add_paragraph("To whom it may concern,\n")

#print(random.choice(Phrase1) + firstName + _space + lastName + " to the " + targettedInstitution + _space)

#_1st_P = str(random.choice(Phrase1) + firstName + _space + lastName + " to the " + targettedInstitution + _space + purposeOfTheLetter + ". " + random.choice(Phrase2) + _space + objective.lower() + _space + "in my classroom. "+ firstName + " was a " + highSchoolYearAttended + " in my " + classAttended + " class in " + schoolYearAttended + ". ")
                #"It is with pleasure that I recommend "                        "I was fortunate to have" "him"
_1st_paragrapth = doc.add_paragraph (random.choice(Phrase1) + firstName + _space + lastName + " to " + targettedInstitution + _space + purposeOfTheLetter + ". " + random.choice(Phrase2) + _space + objective.lower() + _space + "in my classroom. "+ firstName + " was a " + highSchoolYearAttended + " in my " + classAttended + " class in " + schoolYearAttended + ". ")
#_1st_paragrapth = doc.add_paragraph (_1st_P)
if(num_months < 12) : _1st_paragrapth.add_run( "Although I have only taught " + firstName + _space + "for " + str(int(num_months)) + " months, I can already see ")
if(num_months > 12 and num_months < 24) : _1st_paragrapth.add_run("I have known " + firstName + _space + "for over an year, and " + subjective.lower() + " made an impression in me due to ")
if(num_months > 24) : _1st_paragrapth.add_run("I have known " + firstName + _space + "for more than " + str(int(num_months/12)) + " years, and " + subjective.lower() + " made an impression in me due to ")

#print(possessive.lower() + _space + positivePersonalityTraits[0] + _space + "and also " + positivePersonalityTraits[1] + " personality.", end="", flush=True)
_1st_paragrapth.add_run(possessive.lower() + _space + random.choice(academicSkillsFinal) + _space + "and also " +  random.choice(positivePersonalityTraitFinal) + " personality. ",)

#"I want to illustrate a little more about ",         #Him/Her
_1st_paragrapth.add_run(random.choice(Phrase3) +  objective.lower() + " in this letter, and why " + subjective.lower() +  " deserves to be considered in your instituition.")


doc.add_paragraph("\n")

################
#2nd Paragraph
################

acadSkillA = random.choice(academicSkillsFinal)
academicSkillsFinal.remove(acadSkillA)

acadSkillB = random.choice(academicSkillsFinal)
academicSkillsFinal.remove(acadSkillB)

acadSkillC = random.choice(academicSkillsFinal)
academicSkillsFinal.remove(acadSkillC)

# acadSkillD = random.choice(academicSkillsFinal)
# academicSkillsFinal.remove(acadSkillD)


doc.add_paragraph("While in class I have observed some remarkable academic skills. " + firstName + _space + AcademicSkills[acadSkillA] + ". " + subjective  + " also " + AcademicSkills[acadSkillB]
+ random.choice(Phrase5) + subjective.lower() + _space + AcademicSkills[acadSkillC] + ".")#+ random.choice(LinkingWords) + subjective.lower() + _space  + AcademicSkills[acadSkillD] + ".")

doc.add_paragraph("\n")


################
#3rd Paragraph
################


personalTraitA = random.choice(positivePersonalityTraitFinal)
positivePersonalityTraitFinal.remove(personalTraitA)

personalTraitB = random.choice(positivePersonalityTraitFinal)
positivePersonalityTraitFinal.remove(personalTraitB)

personalTraitC = random.choice(positivePersonalityTraitFinal)
positivePersonalityTraitFinal.remove(personalTraitC)

# personalTraitD = random.choice(positivePersonalityTraitFinal)
# positivePersonalityTraitFinal.remove(personalTraitD)


doc.add_paragraph("Besides all " + possessive.lower() + " Academic work, " + firstName + _space + "is a very "+ personalTraitA + " student. " + subjective + _space +  PositivePersonalityTraits[personalTraitB] + ". " + subjective  + " also " + PositivePersonalityTraits[personalTrait2]
+ random.choice(Phrase5) + subjective.lower() + _space + PositivePersonalityTraits[personalTraitC]+ ".")#+ random.choice(LinkingWords) + subjective.lower() + _space  + PositivePersonalityTraits[personalTraitD] + ".")

doc.add_paragraph("\n")

lastParagraph = doc.add_paragraph("Please, contact me if you have any questions.\n")
lastParagraph.add_run("Sincerely,\n\n")

lastParagraph.add_run(teachersName + "\n")
lastParagraph.add_run(str(date.today().month) + "/" + str(date.today().day) + "/" + str(date.today().year))

file_name = (firstName + lastName + "-" + str(date.today().month) + "-" + str(date.today().day) + "-" + str(date.today().year) + ".docx")
doc.save(file_name)

print(file_name + " created sucessfully")
