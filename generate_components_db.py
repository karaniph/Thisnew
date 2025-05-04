import json
import random

# Sample real-world part lists (expand as needed)
TRANSISTORS = [
    ("2N2222A", "NPN General Purpose Transistor", "ON Semiconductor", {"Type": "NPN", "Vce": "40V", "Ic": "0.6A", "hFE": "100", "Package": "TO-18"}),
    ("2N3904", "NPN General Purpose Transistor", "ON Semiconductor", {"Type": "NPN", "Vce": "40V", "Ic": "0.2A", "hFE": "100", "Package": "TO-92"}),
    ("BC547B", "NPN Small Signal Transistor", "ON Semiconductor", {"Type": "NPN", "Vce": "45V", "Ic": "0.1A", "hFE": "200", "Package": "TO-92"}),
    ("2N3055", "NPN Power Transistor", "ON Semiconductor", {"Type": "NPN", "Vce": "60V", "Ic": "15A", "hFE": "20", "Package": "TO-3"}),
    # ... add more real transistors ...
]

ICS = [
    ("LM741", "Operational Amplifier", "Texas Instruments", {"Type": "Op-Amp", "Vcc": "+/-18V", "Slew Rate": "0.5V/us", "Package": "DIP-8"}),
    ("NE555", "Timer IC", "Texas Instruments", {"Type": "Timer", "Vcc": "4.5-16V", "Frequency": "Up to 500kHz", "Package": "DIP-8"}),
    ("CD4011", "Quad NAND Gate", "Texas Instruments", {"Type": "CMOS NAND", "Vcc": "3-15V", "Package": "DIP-14"}),
    ("LM324", "Quad Op-Amp", "STMicroelectronics", {"Type": "Op-Amp", "Vcc": "+3V to +32V", "Package": "DIP-14"}),
    # ... add more real ICs ...
]

MOSFETS = [
    ("IRF540N", "N-Channel Power MOSFET", "Infineon", {"Type": "N-Channel", "Vds": "100V", "Id": "33A", "Rds(on)": "44mΩ", "Package": "TO-220"}),
    ("IRFZ44N", "N-Channel Power MOSFET", "Vishay", {"Type": "N-Channel", "Vds": "55V", "Id": "49A", "Rds(on)": "17.5mΩ", "Package": "TO-220"}),
    ("STP55NF06L", "N-Channel Power MOSFET", "STMicroelectronics", {"Type": "N-Channel", "Vds": "60V", "Id": "55A", "Rds(on)": "18mΩ", "Package": "TO-220"}),
    ("IRLZ44N", "N-Channel Logic Level MOSFET", "Vishay", {"Type": "N-Channel", "Vds": "55V", "Id": "47A", "Rds(on)": "22mΩ", "Package": "TO-220"}),
    # ... add more real MOSFETs ...
]

# Example equivalents for each part (for demonstration, you can expand this list)
EQUIV_DB = {
    "2N2222A": [("PN2222A", "Fairchild", "Direct replacement", "98%"), ("BC547B", "ON Semiconductor", "Lower Ic", "88%")],
    "2N3904": [("BC547", "Philips", "Lower Ic", "90%"), ("2N2222A", "ON Semiconductor", "Higher Ic", "92%")],
    "LM741": [("UA741", "STMicroelectronics", "Same specs", "99%"), ("LM301", "Texas Instruments", "Lower slew rate", "85%")],
    "NE555": [("SE555", "Texas Instruments", "Military version", "98%"), ("NA555", "ON Semiconductor", "Direct replacement", "99%")],
    "IRF540N": [("STP55NF06L", "STMicroelectronics", "Higher current", "95%"), ("FQP50N06", "ON Semiconductor", "Lower Vds", "90%")],
    "IRFZ44N": [("STP55NF06", "STMicroelectronics", "Same specs", "99%"), ("IRLZ44N", "Vishay", "Logic level gate", "95%")],
    # ... add more equivalency data ...
}

# Helper to generate a random percent match string
PERCENTS = ["85%", "88%", "90%", "92%", "95%", "98%", "99%", "93%", "89%", "87%", "96%", "91%", "94%"]
def random_percent():
    return random.choice(PERCENTS)

def generate_entries(category_list, category, prefix, count):
    entries = []
    n = len(category_list)
    for i in range(count):
        idx = i % n
        part, desc, manuf, specs = category_list[idx]
        part_id = f"{prefix}{i+1:03d}"
        equivalents = []
        equivs = EQUIV_DB.get(part, [])
        if not equivs:
            # Generate synthetic equivalents for demonstration
            for j in range(random.randint(2, 4)):
                eq_part = f"{part}-EQ{j+1}"
                equivalents.append({
                    "partNumber": eq_part,
                    "manufacturer": manuf,
                    "notes": "Similar specs",
                    "percentMatch": random_percent()
                })
        else:
            for eq in equivs:
                equivalents.append({
                    "partNumber": eq[0],
                    "manufacturer": eq[1],
                    "notes": eq[2],
                    "percentMatch": eq[3]
                })
        entry = {
            "id": part_id,
            "name": part,
            "category": category,
            "partNumber": part,
            "manufacturer": manuf,
            "description": desc,
            "keySpecs": specs,
            "equivalents": equivalents
        }
        entries.append(entry)
    return entries

def main():
    transistor_entries = generate_entries(TRANSISTORS, "Transistor", "T", 500)
    ic_entries = generate_entries(ICS, "IC", "IC", 500)
    mosfet_entries = generate_entries(MOSFETS, "MOSFET", "M", 500)
    all_entries = transistor_entries + ic_entries + mosfet_entries
    with open("components_equiv_db.json", "w", encoding="utf-8") as f:
        json.dump(all_entries, f, indent=2)
    print(f"Generated {len(all_entries)} entries in components_equiv_db.json")

if __name__ == "__main__":
    main()
