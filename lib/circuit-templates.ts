// Circuit template interface
export interface CircuitTemplate {
  id: string
  name: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  category: string
  components: string[]
  isPremium: boolean
  price?: number // Added price field for premium templates
  imageUrl?: string
  powerSupply?: string
  buildTime?: string
  tools?: string[]
  instructions?: {
    title: string
    description: string
    note?: string
  }[]
  theory?: {
    overview?: string
    concepts?: string[]
    analysis?: string
    equations?: string[]
  }
  troubleshooting?: {
    issue: string
    cause: string
    solution: string
  }[]
  testingTips?: string[]
  relatedCircuits?: {
    id: string
    name: string
    difficulty: string
  }[]
}

// Circuit templates data
const circuitTemplates: CircuitTemplate[] = [
  // Basic category
  {
    id: "simple-led",
    name: "Simple LED Circuit",
    description: "Basic LED circuit with current limiting resistor",
    difficulty: "beginner",
    category: "basic",
    components: ["LED", "Resistor (220Ω)", "Battery/Power Source"],
    isPremium: false,
    powerSupply: "3-12V DC",
    buildTime: "10-15 minutes",
    tools: ["Soldering iron", "Wire cutters", "Multimeter"],
    instructions: [
      {
        title: "Prepare the components",
        description: "Gather an LED, a 220Ω resistor, and a power source (battery or power supply).",
      },
      {
        title: "Connect the resistor",
        description: "Connect one end of the resistor to the positive terminal of the power source.",
      },
      {
        title: "Connect the LED",
        description: "Connect the anode (longer leg) of the LED to the other end of the resistor.",
        note: "Make sure to identify the anode (longer leg) and cathode (shorter leg) of the LED correctly.",
      },
      {
        title: "Complete the circuit",
        description: "Connect the cathode (shorter leg) of the LED to the negative terminal of the power source.",
      },
      {
        title: "Test the circuit",
        description: "Apply power to the circuit. The LED should light up.",
      },
    ],
    theory: {
      overview: "This simple LED circuit demonstrates Ohm's Law and the need for current limiting in LED applications.",
      concepts: [
        "Current limiting with resistors",
        "LED forward voltage",
        "Ohm's Law application",
        "Basic circuit analysis",
      ],
      analysis:
        "The resistor limits the current flowing through the LED to prevent damage. The value of the resistor is calculated using Ohm's Law: R = (Vs - Vf) / I, where Vs is the supply voltage, Vf is the LED forward voltage, and I is the desired LED current.",
      equations: ["R = (Vs - Vf) / I", "For a red LED: R = (9V - 2V) / 0.02A = 350Ω (use 330Ω standard value)"],
    },
    troubleshooting: [
      {
        issue: "LED doesn't light up",
        cause: "LED connected backwards",
        solution: "Reverse the LED connections (longer leg to positive)",
      },
      {
        issue: "LED is too dim",
        cause: "Resistor value too high",
        solution: "Use a lower value resistor (e.g., 150Ω instead of 220Ω)",
      },
      {
        issue: "LED burns out quickly",
        cause: "Resistor value too low or missing",
        solution: "Ensure proper resistor value is used (220Ω for 9V supply)",
      },
    ],
    testingTips: [
      "Use a multimeter to measure the current through the LED",
      "Try different color LEDs (they have different forward voltages)",
      "Experiment with different resistor values to change brightness",
    ],
    relatedCircuits: [
      {
        id: "leds-series",
        name: "LEDs in Series",
        difficulty: "beginner",
      },
      {
        id: "leds-parallel",
        name: "LEDs in Parallel",
        difficulty: "beginner",
      },
      {
        id: "led-flasher",
        name: "LED Flasher Circuit",
        difficulty: "intermediate",
      },
    ],
  },
  {
    id: "leds-series",
    name: "LEDs in Series",
    description: "Multiple LEDs connected in series with a single resistor",
    difficulty: "beginner",
    category: "basic",
    components: ["LEDs (3)", "Resistor (470Ω)", "Battery/Power Source"],
    isPremium: false,
    powerSupply: "9-12V DC",
    buildTime: "15-20 minutes",
    instructions: [
      {
        title: "Prepare the components",
        description: "Gather three LEDs, a 470Ω resistor, and a power source (9V or higher).",
      },
      {
        title: "Connect the resistor",
        description: "Connect one end of the resistor to the positive terminal of the power source.",
      },
      {
        title: "Connect the first LED",
        description: "Connect the anode (longer leg) of the first LED to the other end of the resistor.",
      },
      {
        title: "Connect LEDs in series",
        description:
          "Connect the cathode (shorter leg) of the first LED to the anode (longer leg) of the second LED. Then connect the cathode of the second LED to the anode of the third LED.",
        note: "Make sure all LEDs are oriented in the same direction.",
      },
      {
        title: "Complete the circuit",
        description: "Connect the cathode (shorter leg) of the third LED to the negative terminal of the power source.",
      },
      {
        title: "Test the circuit",
        description: "Apply power to the circuit. All three LEDs should light up with equal brightness.",
      },
    ],
    theory: {
      overview:
        "This circuit demonstrates how LEDs can be connected in series to operate from a higher voltage source.",
      concepts: [
        "Series circuit principles",
        "Voltage division in series circuits",
        "Current limiting for multiple LEDs",
        "Power supply requirements for series LEDs",
      ],
      analysis:
        "In a series LED circuit, the same current flows through all LEDs. The supply voltage must be greater than the sum of all LED forward voltages. The resistor value is calculated using: R = (Vs - (Vf × n)) / I, where n is the number of LEDs in series.",
      equations: [
        "R = (Vs - (Vf × n)) / I",
        "For 3 red LEDs: R = (12V - (2V × 3)) / 0.02A = 300Ω (use 330Ω standard value)",
      ],
    },
    troubleshooting: [
      {
        issue: "No LEDs light up",
        cause: "Insufficient supply voltage or one LED connected backwards",
        solution: "Check LED orientation and ensure supply voltage exceeds sum of LED forward voltages",
      },
      {
        issue: "Only some LEDs light up",
        cause: "One or more LEDs are faulty",
        solution: "Test each LED individually and replace any faulty ones",
      },
    ],
  },
  {
    id: "leds-parallel",
    name: "LEDs in Parallel",
    description: "Multiple LEDs connected in parallel with individual resistors",
    difficulty: "beginner",
    category: "basic",
    components: ["LEDs (3)", "Resistors (220Ω) (3)", "Battery/Power Source"],
    isPremium: false,
    powerSupply: "5-12V DC",
    buildTime: "20-30 minutes",
    instructions: [
      {
        title: "Prepare the components",
        description: "Gather three LEDs, three 220Ω resistors, and a power source.",
      },
      {
        title: "Create the first LED branch",
        description:
          "Connect one end of the first resistor to the positive terminal. Connect the anode of the first LED to the other end of the resistor. Connect the cathode to the negative terminal.",
      },
      {
        title: "Create additional LED branches",
        description: "Repeat the same process for the other two LEDs, each with its own resistor.",
        note: "Each LED-resistor pair forms an independent branch between the power terminals.",
      },
      {
        title: "Test the circuit",
        description: "Apply power to the circuit. All three LEDs should light up independently.",
      },
    ],
    theory: {
      overview: "This circuit demonstrates parallel connections where each LED has its own current path.",
      concepts: [
        "Parallel circuit principles",
        "Independent current paths",
        "Load balancing in parallel circuits",
        "Current calculation in parallel branches",
      ],
    },
  },
  {
    id: "led-flasher",
    name: "LED Flasher Circuit",
    description: "Simple circuit to make an LED flash using a 555 timer",
    difficulty: "intermediate",
    category: "basic",
    components: ["555 Timer IC", "LED", "Resistors (1kΩ, 10kΩ)", "Capacitor (10μF)", "Battery/Power Source"],
    isPremium: false,
    powerSupply: "5-15V DC",
    buildTime: "30-45 minutes",
    instructions: [
      {
        title: "Prepare the components",
        description: "Gather a 555 timer IC, LED, resistors (1kΩ, 10kΩ), 10μF capacitor, and power source.",
      },
      {
        title: "Connect the 555 timer",
        description: "Place the 555 timer on a breadboard with pin 1 connected to ground and pin 8 to positive supply.",
      },
      {
        title: "Set up the timing components",
        description:
          "Connect the 10kΩ resistor between pins 7 and 8. Connect the 1kΩ resistor between pins 6 and 7. Connect the 10μF capacitor between pin 2 and ground.",
      },
      {
        title: "Connect pins 2 and 6",
        description: "Connect pins 2 and 6 together to configure the 555 timer in astable mode.",
      },
      {
        title: "Connect the LED",
        description:
          "Connect a 220Ω resistor to pin 3, then connect the LED anode to the other end of the resistor and the cathode to ground.",
      },
      {
        title: "Test the circuit",
        description:
          "Apply power to the circuit. The LED should start flashing at a rate determined by the RC time constant.",
      },
    ],
    theory: {
      overview: "This circuit uses a 555 timer IC in astable mode to generate pulses that flash the LED.",
      concepts: [
        "555 timer operation in astable mode",
        "RC time constant calculation",
        "Duty cycle and frequency control",
        "Pulse generation circuits",
      ],
      equations: ["Frequency = 1.44 / ((R1 + 2R2) × C)", "Duty Cycle = (R1 + R2) / (R1 + 2R2)"],
    },
  },

  // Amplifiers category
  {
    id: "common-emitter",
    name: "Common Emitter Amplifier",
    description: "Basic single-stage amplifier with voltage gain",
    difficulty: "beginner",
    category: "amplifiers",
    components: [
      "NPN Transistor (2N3904)",
      "Resistors (10kΩ, 1kΩ, 2.2kΩ, 100Ω)",
      "Capacitors (10μF, 100μF)",
      "Battery/Power Source",
    ],
    isPremium: false,
    powerSupply: "9-12V DC",
    buildTime: "30-45 minutes",
    instructions: [
      {
        title: "Prepare the components",
        description: "Gather all components including the 2N3904 transistor, resistors, capacitors, and power source.",
      },
      {
        title: "Set up the collector circuit",
        description: "Connect the 1kΩ resistor between the positive supply and the collector of the transistor.",
      },
      {
        title: "Set up the base bias",
        description: "Connect the 10kΩ resistor between the positive supply and the base of the transistor.",
      },
      {
        title: "Set up the emitter circuit",
        description:
          "Connect the 100Ω resistor between the emitter and ground. Connect the 100μF capacitor in parallel with this resistor.",
      },
      {
        title: "Add input coupling",
        description: "Connect the 10μF capacitor to the base as the input coupling capacitor.",
      },
      {
        title: "Add output coupling",
        description: "Connect another 10μF capacitor to the collector as the output coupling capacitor.",
      },
      {
        title: "Test the circuit",
        description:
          "Apply power and connect an audio source to the input and a speaker or oscilloscope to the output to verify amplification.",
      },
    ],
    theory: {
      overview:
        "The common emitter amplifier is a fundamental transistor amplifier configuration that provides voltage gain and signal inversion.",
      concepts: [
        "Transistor biasing",
        "Voltage gain calculation",
        "Signal inversion",
        "Impedance matching",
        "Frequency response",
      ],
      analysis:
        "The transistor is biased in the active region using the voltage divider formed by the base resistors. The emitter resistor provides negative feedback for stability. The coupling capacitors block DC while allowing AC signals to pass.",
      equations: [
        "Voltage Gain ≈ Collector Resistor / Emitter Resistor",
        "Input Impedance ≈ Base Resistor || (β × Emitter Resistor)",
      ],
    },
  },
  {
    id: "darlington-pair",
    name: "Darlington Pair",
    description: "High current gain amplifier using two transistors",
    difficulty: "intermediate",
    category: "amplifiers",
    components: ["NPN Transistors (2N3904) (2)", "Resistors (10kΩ, 1kΩ, 100Ω)", "Battery/Power Source"],
    isPremium: false,
    powerSupply: "9-12V DC",
    buildTime: "25-40 minutes",
    instructions: [
      {
        title: "Prepare the components",
        description: "Gather two 2N3904 transistors, resistors, and power source.",
      },
      {
        title: "Connect the transistors",
        description:
          "Connect the collector of the first transistor to the collector of the second transistor. Connect the emitter of the first transistor to the base of the second transistor.",
      },
      {
        title: "Set up the bias",
        description: "Connect the 10kΩ resistor between the positive supply and the base of the first transistor.",
      },
      {
        title: "Set up the collector circuit",
        description: "Connect the 1kΩ resistor between the positive supply and the common collector connection.",
      },
      {
        title: "Set up the emitter circuit",
        description: "Connect the 100Ω resistor between the emitter of the second transistor and ground.",
      },
      {
        title: "Test the circuit",
        description:
          "Apply power and test the circuit with a small input signal to observe the high gain amplification.",
      },
    ],
    theory: {
      overview:
        "The Darlington pair configuration combines two transistors to achieve very high current gain, approximately equal to the product of the individual transistor gains.",
      concepts: [
        "Compound transistor configurations",
        "Current gain multiplication",
        "Input impedance boosting",
        "Voltage drop considerations",
      ],
      equations: ["Total Current Gain (βtotal) = β1 × β2", "Base-Emitter Voltage (VBE) = VBE1 + VBE2 ≈ 1.4V"],
    },
  },
  {
    id: "differential-amplifier",
    name: "Differential Amplifier",
    description: "Amplifies the difference between two input signals",
    difficulty: "advanced",
    category: "amplifiers",
    components: [
      "NPN Transistors (2N3904) (2)",
      "Resistors (10kΩ, 1kΩ (2), 2.2kΩ)",
      "Current Source",
      "Battery/Power Source",
    ],
    isPremium: true,
    price: 4.99,
    powerSupply: "±12V DC",
    buildTime: "45-60 minutes",
    instructions: [
      {
        title: "Prepare the components",
        description: "Gather all components including transistors, resistors, and power source.",
      },
      {
        title: "Set up the current source",
        description: "Create a current source for the emitter circuit.",
      },
      {
        title: "Connect the transistors",
        description: "Place the two transistors side by side with their emitters connected together.",
      },
      {
        title: "Add collector resistors",
        description: "Connect 1kΩ resistors from each collector to the positive supply.",
      },
      {
        title: "Connect the current source",
        description: "Connect the current source to the common emitter point.",
      },
      {
        title: "Test the circuit",
        description: "Apply differential signals to the bases and observe the output at the collectors.",
      },
    ],
  },
  {
    id: "class-a",
    name: "Class A Amplifier",
    description: "High fidelity audio amplifier with single-ended output",
    difficulty: "intermediate",
    category: "amplifiers",
    components: [
      "NPN Transistor (2N3904)",
      "Resistors (10kΩ, 2.2kΩ, 1kΩ)",
      "Capacitors (10μF, 100μF)",
      "Battery/Power Source",
    ],
    isPremium: true,
    price: 3.99,
    powerSupply: "12-15V DC",
    buildTime: "40-60 minutes",
  },
  {
    id: "class-b",
    name: "Class B Push-Pull Amplifier",
    description: "Efficient audio amplifier with complementary transistors",
    difficulty: "advanced",
    category: "amplifiers",
    components: [
      "NPN Transistor (2N3904)",
      "PNP Transistor (2N3906)",
      "Resistors (10kΩ, 1kΩ, 100Ω, 0.1Ω)",
      "Capacitors (10μF, 100μF)",
      "Battery/Power Source",
    ],
    isPremium: true,
    price: 5.99,
    powerSupply: "±12V DC",
    buildTime: "60-90 minutes",
  },

  // Oscillators category
  {
    id: "astable-multivibrator",
    name: "Astable Multivibrator",
    description: "Square wave oscillator using two transistors",
    difficulty: "intermediate",
    category: "oscillators",
    components: [
      "NPN Transistors (2N3904) (2)",
      "Resistors (10kΩ (2), 1kΩ (2))",
      "Capacitors (10μF (2))",
      "LEDs (2)",
      "Battery/Power Source",
    ],
    isPremium: false,
    powerSupply: "9V DC",
    buildTime: "30-45 minutes",
    instructions: [
      {
        title: "Prepare the components",
        description: "Gather two 2N3904 transistors, resistors, capacitors, LEDs, and power source.",
      },
      {
        title: "Set up the first transistor",
        description:
          "Connect a 10kΩ resistor between the positive supply and the collector of the first transistor. Connect an LED in series with a 1kΩ resistor between the collector and ground.",
      },
      {
        title: "Set up the second transistor",
        description: "Repeat the same connections for the second transistor.",
      },
      {
        title: "Create the cross-coupling",
        description:
          "Connect a 10μF capacitor from the collector of the first transistor to the base of the second transistor. Connect another 10μF capacitor from the collector of the second transistor to the base of the first transistor.",
      },
      {
        title: "Add base resistors",
        description: "Connect a 10kΩ resistor from the base of each transistor to ground.",
      },
      {
        title: "Test the circuit",
        description: "Apply power to the circuit. The LEDs should alternately flash on and off.",
      },
    ],
    theory: {
      overview:
        "The astable multivibrator is a free-running oscillator that continuously switches between two unstable states, producing a square wave output.",
      concepts: [
        "RC time constant",
        "Transistor switching",
        "Cross-coupling feedback",
        "Oscillator frequency calculation",
      ],
      equations: ["Frequency ≈ 1 / (1.4 × R × C)", "Period = 0.7 × R × C for each half-cycle"],
    },
  },
  {
    id: "wien-bridge",
    name: "Wien Bridge Oscillator",
    description: "Sine wave oscillator using op-amp",
    difficulty: "advanced",
    category: "oscillators",
    components: ["Op-Amp (LM741)", "Resistors (10kΩ (2), 22kΩ, 1kΩ)", "Capacitors (10nF (2))", "Battery/Power Source"],
    isPremium: true,
    price: 4.99,
    powerSupply: "±12V DC",
    buildTime: "45-60 minutes",
  },
  {
    id: "colpitts",
    name: "Colpitts Oscillator",
    description: "LC oscillator using capacitive voltage divider",
    difficulty: "advanced",
    category: "oscillators",
    components: [
      "NPN Transistor (2N3904)",
      "Resistors (10kΩ, 4.7kΩ, 1kΩ)",
      "Capacitors (100pF, 470pF, 10μF)",
      "Inductor (10μH)",
      "Battery/Power Source",
    ],
    isPremium: true,
    price: 5.99,
    powerSupply: "9-12V DC",
    buildTime: "50-70 minutes",
  },

  // Power category
  {
    id: "transistor-regulator",
    name: "Transistor Voltage Regulator",
    description: "Simple voltage regulator using a transistor and zener diode",
    difficulty: "beginner",
    category: "power",
    components: ["NPN Transistor (2N3055)", "Zener Diode (5.1V)", "Resistors (1kΩ, 470Ω)", "Battery/Power Source"],
    isPremium: false,
    powerSupply: "9-15V DC",
    buildTime: "20-30 minutes",
    instructions: [
      {
        title: "Prepare the components",
        description: "Gather a 2N3055 transistor, 5.1V zener diode, resistors, and power source.",
      },
      {
        title: "Set up the zener reference",
        description:
          "Connect the 1kΩ resistor between the positive supply and the cathode of the zener diode. Connect the anode of the zener diode to ground.",
      },
      {
        title: "Connect the transistor",
        description:
          "Connect the base of the 2N3055 transistor to the cathode of the zener diode. Connect the collector to the positive supply.",
      },
      {
        title: "Set up the output",
        description:
          "The emitter of the transistor is the regulated output. Connect a load (e.g., 470Ω resistor) between the emitter and ground.",
      },
      {
        title: "Test the circuit",
        description:
          "Apply power to the circuit. Measure the output voltage, which should be approximately 4.4V (5.1V minus the base-emitter drop).",
      },
    ],
    theory: {
      overview:
        "This simple voltage regulator uses a zener diode as a reference voltage and a transistor as a series pass element to maintain a stable output voltage.",
      concepts: [
        "Zener diode voltage reference",
        "Series pass transistor operation",
        "Voltage regulation principles",
        "Power dissipation considerations",
      ],
      equations: [
        "Output Voltage = Zener Voltage - VBE",
        "Maximum Load Current = (Supply Voltage - Output Voltage) / Load Resistance",
      ],
    },
  },
  {
    id: "buck-converter",
    name: "Buck Converter",
    description: "Step-down DC-DC converter",
    difficulty: "advanced",
    category: "power",
    components: [
      "MOSFET (IRF540N)",
      "Diode (1N5822)",
      "Inductor (100μH)",
      "Capacitors (100μF, 10μF)",
      "Resistors (10kΩ, 1kΩ)",
      "Battery/Power Source",
    ],
    isPremium: true,
    price: 6.99,
    powerSupply: "12-24V DC",
    buildTime: "60-90 minutes",
  },
  {
    id: "boost-converter",
    name: "Boost Converter",
    description: "Step-up DC-DC converter",
    difficulty: "advanced",
    category: "power",
    components: [
      "MOSFET (IRF540N)",
      "Diode (1N5822)",
      "Inductor (100μH)",
      "Capacitors (100μF, 10μF)",
      "Resistors (10kΩ, 1kΩ)",
      "Battery/Power Source",
    ],
    isPremium: true,
    price: 6.99,
    powerSupply: "5-12V DC",
    buildTime: "60-90 minutes",
  },

  // Sensors category
  {
    id: "light-sensor",
    name: "Light Sensor Circuit",
    description: "Light-dependent resistor circuit to detect brightness",
    difficulty: "beginner",
    category: "sensors",
    components: [
      "LDR (Light Dependent Resistor)",
      "Resistor (10kΩ)",
      "LED",
      "NPN Transistor (2N3904)",
      "Battery/Power Source",
    ],
    isPremium: false,
    powerSupply: "5-9V DC",
    buildTime: "20-30 minutes",
    instructions: [
      {
        title: "Prepare the components",
        description: "Gather an LDR, 10kΩ resistor, 2N3904 transistor, LED, 220Ω resistor, and power source.",
      },
      {
        title: "Create the voltage divider",
        description:
          "Connect the LDR and 10kΩ resistor in series between the positive supply and ground to form a voltage divider.",
      },
      {
        title: "Connect the transistor",
        description:
          "Connect the junction of the LDR and resistor to the base of the 2N3904 transistor. Connect the emitter to ground.",
      },
      {
        title: "Connect the LED",
        description:
          "Connect a 220Ω resistor in series with the LED between the positive supply and the collector of the transistor.",
      },
      {
        title: "Test the circuit",
        description:
          "Apply power to the circuit. The LED should turn on in darkness and turn off in bright light (or vice versa, depending on your connections).",
      },
    ],
    theory: {
      overview:
        "This circuit uses an LDR (Light Dependent Resistor) whose resistance changes with light intensity to control a transistor switch.",
      concepts: [
        "Voltage divider principle",
        "Light-dependent resistance",
        "Transistor as a switch",
        "Threshold detection",
      ],
      analysis:
        "The LDR and fixed resistor form a voltage divider. As light intensity changes, the voltage at their junction changes, turning the transistor on or off when it crosses the threshold voltage.",
    },
  },
  {
    id: "temperature-sensor",
    name: "Temperature Sensor",
    description: "Simple temperature sensing circuit using a thermistor",
    difficulty: "intermediate",
    category: "sensors",
    components: [
      "Thermistor (NTC)",
      "Resistor (10kΩ)",
      "Op-Amp (LM358)",
      "Resistors (10kΩ, 1kΩ, 100kΩ)",
      "Battery/Power Source",
    ],
    isPremium: true,
    price: 4.99,
    powerSupply: "5-12V DC",
    buildTime: "30-45 minutes",
  },
  {
    id: "pir-motion-detector",
    name: "PIR Motion Detector",
    description: "Detects motion using passive infrared sensor",
    difficulty: "intermediate",
    category: "sensors",
    components: [
      "PIR Sensor Module",
      "NPN Transistor (2N3904)",
      "Resistors (10kΩ, 1kΩ, 220Ω)",
      "LED",
      "Battery/Power Source",
    ],
    isPremium: true,
    price: 5.99,
    powerSupply: "5V DC",
    buildTime: "30-40 minutes",
  },

  // Digital category
  {
    id: "rs-flip-flop",
    name: "RS Flip-Flop",
    description: "Basic memory element using discrete gates",
    difficulty: "beginner",
    category: "digital",
    components: ["NOR Gates (2) or NAND Gates (2)", "LEDs (2)", "Resistors (220Ω) (2)", "Battery/Power Source"],
    isPremium: true,
    price: 3.99,
    powerSupply: "5V DC",
    buildTime: "20-30 minutes",
  },
  {
    id: "jk-flip-flop",
    name: "JK Flip-Flop",
    description: "Versatile flip-flop with no invalid states",
    difficulty: "intermediate",
    category: "digital",
    components: ["NAND Gates (4)", "LEDs (2)", "Resistors (10kΩ, 220Ω) (4)", "Battery/Power Source"],
    isPremium: true,
    price: 4.99,
    powerSupply: "5V DC",
    buildTime: "40-60 minutes",
  },
  {
    id: "binary-counter",
    name: "4-Bit Binary Counter",
    description: "Counts pulses and displays in binary",
    difficulty: "intermediate",
    category: "digital",
    components: ["JK Flip-Flops (4)", "LEDs (4)", "Resistors (220Ω) (4)", "Push Button", "Battery/Power Source"],
    isPremium: true,
    price: 5.99,
    powerSupply: "5V DC",
    buildTime: "50-70 minutes",
  },
]

/**
 * Get all circuit templates
 */
export function getAllCircuitTemplates(): CircuitTemplate[] {
  return circuitTemplates
}

/**
 * Get a circuit template by ID
 */
export function getCircuitTemplateById(id: string): CircuitTemplate | null {
  return circuitTemplates.find((template) => template.id === id) || null
}

/**
 * Get SVG schematic for a circuit
 */
export function getCircuitSchematicSVG(circuitId: string, preview = false): string {
  // Return the appropriate SVG based on the circuit ID
  switch (circuitId) {
    case "simple-led":
      return `
        <svg width="${preview ? "100%" : "500"}" height="${preview ? "100%" : "300"}" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Battery -->
          <rect x="50" y="130" width="30" height="60" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="40" y1="140" x2="60" y2="140" stroke="currentColor" stroke-width="3" />
          <line x1="45" y1="180" x2="55" y2="180" stroke="currentColor" stroke-width="2" />
          <text x="45" y="210" font-size="12" fill="currentColor">Battery</text>
          
          <!-- Wires -->
          <line x1="80" y1="150" x2="150" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="250" y1="150" x2="320" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="400" y1="150" x2="450" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="450" y1="150" x2="450" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="450" y1="250" x2="50" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="50" y1="250" x2="50" y2="190" stroke="currentColor" stroke-width="2" />
          
          <!-- Resistor -->
          <path d="M150,150 L170,150 L175,140 L185,160 L195,140 L205,160 L215,140 L225,160 L230,150 L250,150" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="180" y="130" font-size="12" fill="currentColor">220Ω</text>
          
          <!-- LED -->
          <polygon points="320,130 360,150 320,170 320,130" fill="none" stroke="currentColor" stroke-width="2" />
          <circle cx="360" cy="150" r="20" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="360" y1="130" x2="360" y2="170" stroke="currentColor" stroke-width="1" stroke-dasharray="2,1" />
          <text x="340" y="190" font-size="12" fill="currentColor">LED</text>
          
          <!-- Arrows for current flow -->
          <path d="M120,130 L130,140 L120,150" fill="none" stroke="currentColor" stroke-width="1" />
          <path d="M290,130 L300,140 L290,150" fill="none" stroke="currentColor" stroke-width="1" />
          <path d="M420,130 L430,140 L420,150" fill="none" stroke="currentColor" stroke-width="1" />
          
          <!-- Labels -->
          <text x="90" y="140" font-size="12" fill="currentColor">+</text>
          <text x="45" y="240" font-size="12" fill="currentColor">-</text>
        </svg>
      `
    case "leds-series":
      return `
        <svg width="${preview ? "100%" : "500"}" height="${preview ? "100%" : "300"}" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Battery -->
          <rect x="50" y="130" width="30" height="60" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="40" y1="140" x2="60" y2="140" stroke="currentColor" stroke-width="3" />
          <line x1="45" y1="180" x2="55" y2="180" stroke="currentColor" stroke-width="2" />
          <text x="45" y="210" font-size="12" fill="currentColor">9V</text>
          
          <!-- Wires -->
          <line x1="80" y1="150" x2="120" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="200" y1="150" x2="220" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="280" y1="150" x2="300" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="360" y1="150" x2="380" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="440" y1="150" x2="450" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="450" y1="150" x2="450" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="450" y1="250" x2="50" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="50" y1="250" x2="50" y2="190" stroke="currentColor" stroke-width="2" />
          
          <!-- Resistor -->
          <path d="M120,150 L130,150 L135,140 L145,160 L155,140 L165,160 L175,140 L185,160 L190,150 L200,150" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="140" y="130" font-size="12" fill="currentColor">470Ω</text>
          
          <!-- LED 1 -->
          <polygon points="220,130 240,150 220,170 220,130" fill="none" stroke="currentColor" stroke-width="2" />
          <circle cx="240" cy="150" r="15" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="240" y1="135" x2="240" y2="165" stroke="currentColor" stroke-width="1" stroke-dasharray="2,1" />
          <text x="220" y="190" font-size="12" fill="currentColor">LED 1</text>
          
          <!-- LED 2 -->
          <polygon points="300,130 320,150 300,170 300,130" fill="none" stroke="currentColor" stroke-width="2" />
          <circle cx="320" cy="150" r="15" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="320" y1="135" x2="320" y2="165" stroke="currentColor" stroke-width="1" stroke-dasharray="2,1" />
          <text x="300" y="190" font-size="12" fill="currentColor">LED 2</text>
          
          <!-- LED 3 -->
          <polygon points="380,130 400,150 380,170 380,130" fill="none" stroke="currentColor" stroke-width="2" />
          <circle cx="400" cy="150" r="15" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="400" y1="135" x2="400" y2="165" stroke="currentColor" stroke-width="1" stroke-dasharray="2,1" />
          <text x="380" y="190" font-size="12" fill="currentColor">LED 3</text>
          
          <!-- Arrows for current flow -->
          <path d="M100,130 L110,140 L100,150" fill="none" stroke="currentColor" stroke-width="1" />
          <path d="M260,130 L270,140 L260,150" fill="none" stroke="currentColor" stroke-width="1" />
          <path d="M340,130 L350,140 L340,150" fill="none" stroke="currentColor" stroke-width="1" />
          <path d="M420,130 L430,140 L420,150" fill="none" stroke="currentColor" stroke-width="1" />
          
          <!-- Labels -->
          <text x="90" y="140" font-size="12" fill="currentColor">+</text>
          <text x="45" y="240" font-size="12" fill="currentColor">-</text>
        </svg>
      `
    case "leds-parallel":
      return `
        <svg width="${preview ? "100%" : "500"}" height="${preview ? "100%" : "300"}" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Battery -->
          <rect x="50" y="130" width="30" height="60" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="40" y1="140" x2="60" y2="140" stroke="currentColor" stroke-width="3" />
          <line x1="45" y1="180" x2="55" y2="180" stroke="currentColor" stroke-width="2" />
          <text x="45" y="210" font-size="12" fill="currentColor">Battery</text>
          
          <!-- Main Wires -->
          <line x1="80" y1="150" x2="450" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="80" y1="250" x2="450" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="50" y1="190" x2="50" y2="250" stroke="currentColor" stroke-width="2" />
          
          <!-- LED Branch 1 -->
          <line x1="150" y1="150" x2="150" y2="170" stroke="currentColor" stroke-width="2" />
          <path d="M150,170 L155,170 L160,160 L170,180 L180,160 L190,180 L195,170 L200,170" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="200" y1="170" x2="200" y2="190" stroke="currentColor" stroke-width="2" />
          <polygon points="180,190 220,210 180,230 180,190" fill="none" stroke="currentColor" stroke-width="2" />
          <circle cx="220" cy="210" r="15" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="220" y1="195" x2="220" y2="225" stroke="currentColor" stroke-width="1" stroke-dasharray="2,1" />
          <line x1="220" y1="210" x2="220" y2="250" stroke="currentColor" stroke-width="2" />
          <text x="170" y="170" font-size="10" fill="currentColor">220Ω</text>
          <text x="180" y="245" font-size="10" fill="currentColor">LED 1</text>
          
          <!-- LED Branch 2 -->
          <line x1="250" y1="150" x2="250" y2="170" stroke="currentColor" stroke-width="2" />
          <path d="M250,170 L255,170 L260,160 L270,180 L280,160 L290,180 L295,170 L300,170" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="300" y1="170" x2="300" y2="190" stroke="currentColor" stroke-width="2" />
          <polygon points="280,190 320,210 280,230 280,190" fill="none" stroke="currentColor" stroke-width="2" />
          <circle cx="320" cy="210" r="15" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="320" y1="195" x2="320" y2="225" stroke="currentColor" stroke-width="1" stroke-dasharray="2,1" />
          <line x1="320" y1="210" x2="320" y2="250" stroke="currentColor" stroke-width="2" />
          <text x="270" y="170" font-size="10" fill="currentColor">220Ω</text>
          <text x="280" y="245" font-size="10" fill="currentColor">LED 2</text>
          
          <!-- LED Branch 3 -->
          <line x1="350" y1="150" x2="350" y2="170" stroke="currentColor" stroke-width="2" />
          <path d="M350,170 L355,170 L360,160 L370,180 L380,160 L390,180 L395,170 L400,170" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="400" y1="170" x2="400" y2="190" stroke="currentColor" stroke-width="2" />
          <polygon points="380,190 420,210 380,230 380,190" fill="none" stroke="currentColor" stroke-width="2" />
          <circle cx="420" cy="210" r="15" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="420" y1="195" x2="420" y2="225" stroke="currentColor" stroke-width="1" stroke-dasharray="2,1" />
          <line x1="420" y1="210" x2="420" y2="250" stroke="currentColor" stroke-width="2" />
          <text x="370" y="170" font-size="10" fill="currentColor">220Ω</text>
          <text x="380" y="245" font-size="10" fill="currentColor">LED 3</text>
          
          <!-- Labels -->
          <text x="90" y="140" font-size="12" fill="currentColor">+</text>
          <text x="45" y="240" font-size="12" fill="currentColor">-</text>
        </svg>
      `
    case "led-flasher":
      return `
        <svg width="${preview ? "100%" : "500"}" height="${preview ? "100%" : "300"}" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
          <!-- 555 Timer IC -->
          <rect x="200" y="100" width="100" height="140" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="235" y="170" font-size="14" fill="currentColor">555</text>
          <text x="190" y="115" font-size="10" fill="currentColor">1</text>
          <text x="190" y="135" font-size="10" fill="currentColor">2</text>
          <text x="190" y="155" font-size="10" fill="currentColor">3</text>
          <text x="190" y="175" font-size="10" fill="currentColor">4</text>
          <text x="310" y="115" font-size="10" fill="currentColor">8</text>
          <text x="310" y="135" font-size="10" fill="currentColor">7</text>
          <text x="310" y="155" font-size="10" fill="currentColor">6</text>
          <text x="310" y="175" font-size="10" fill="currentColor">5</text>
          
          <!-- Power Supply -->
          <rect x="50" y="130" width="30" height="60" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="40" y1="140" x2="60" y2="140" stroke="currentColor" stroke-width="3" />
          <line x1="45" y1="180" x2="55" y2="180" stroke="currentColor" stroke-width="2" />
          <text x="45" y="210" font-size="12" fill="currentColor">9V</text>
          
          <!-- Wires -->
          <line x1="80" y1="150" x2="120" y2="150" stroke="currentColor" stroke-width="2" /> <!-- Battery to VCC -->
          <line x1="120" y1="150" x2="120" y2="110" stroke="currentColor" stroke-width="2" />
          <line x1="120" y1="110" x2="200" y2="110" stroke="currentColor" stroke-width="2" /> <!-- VCC to pin 8 -->
          
          <line x1="50" y1="190" x2="50" y2="250" stroke="currentColor" stroke-width="2" /> <!-- Battery GND -->
          <line x1="50" y1="250" x2="150" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="150" y1="250" x2="150" y2="110" stroke="currentColor" stroke-width="2" />
          <line x1="150" y1="110" x2="150" y2="175" stroke="currentColor" stroke-width="2" />
          <line x1="150" y1="175" x2="200" y2="175" stroke="currentColor" stroke-width="2" /> <!-- GND to pin 1 -->
          
          <!-- Timing Components -->
          <path d="M300,110 L350,110 L350,135" fill="none" stroke="currentColor" stroke-width="2" /> <!-- Pin 8 to R1 -->
          <path d="M350,135 L355,135 L360,125 L370,145 L380,125 L390,145 L395,135 L400,135" fill="none" stroke="currentColor" stroke-width="2" /> <!-- R1 -->
          <text x="370" y="120" font-size="10" fill="currentColor">10kΩ</text>
          
          <line x1="400" y1="135" x2="400" y2="155" stroke="currentColor" stroke-width="2" /> <!-- R1 to R2 and pin 7 -->
          <line x1="400" y1="135" x2="300" y2="135" stroke="currentColor" stroke-width="2" /> <!-- R1 to pin 7 -->
          
          <path d="M400,155 L405,155 L410,145 L420,165 L430,145 L440,165 L445,155 L450,155" fill="none" stroke="currentColor" stroke-width="2" /> <!-- R2 -->
          <text x="420" y="140" font-size="10" fill="currentColor">1kΩ</text>
          
          <line x1="450" y1="155" x2="450" y2="175" stroke="currentColor" stroke-width="2" /> <!-- R2 to C -->
          <line x1="450" y1="155" x2="300" y2="155" stroke="currentColor" stroke-width="2" /> <!-- R2 to pin 6 -->
          
          <!-- Capacitor -->
          <line x1="450" y1="175" x2="450" y2="195" stroke="currentColor" stroke-width="2" />
          <line x1="440" y1="195" x2="460" y2="195" stroke="currentColor" stroke-width="2" />
          <path d="M440,200 L460,200" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="450" y1="200" x2="450" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="450" y1="250" x2="150" y2="250" stroke="currentColor" stroke-width="2" />
          <text x="460" y="200" font-size="10" fill="currentColor">10μF</text>
          
          <!-- Connect pins 2 and 6 -->
          <line x1="200" y1="135" x2="180" y2="135" stroke="currentColor" stroke-width="2" /> <!-- Pin 2 -->
          <line x1="180" y1="135" x2="180" y2="155" stroke="currentColor" stroke-width="2" />
          <line x1="180" y1="155" x2="200" y2="155" stroke="currentColor" stroke-width="2" /> <!-- Pin 6 -->
          
          <!-- LED Circuit -->
          <line x1="300" y1="175" x2="320" y2="175" stroke="currentColor" stroke-width="2" /> <!-- Pin 3 to LED -->
          <path d="M320,175 L325,175 L330,165 L340,185 L350,165 L360,185 L365,175 L370,175" fill="none" stroke="currentColor" stroke-width="2" /> <!-- Resistor -->
          <text x="340" y="160" font-size="10" fill="currentColor">220Ω</text>
          
          <line x1="370" y1="175" x2="390" y2="175" stroke="currentColor" stroke-width="2" />
          <polygon points="390,155 410,175 390,195 390,155" fill="none" stroke="currentColor" stroke-width="2" /> <!-- LED -->
          <circle cx="410" cy="175" r="15" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="410" y1="160" x2="410" y2="190" stroke="currentColor" stroke-width="1" stroke-dasharray="2,1" />
          <line x1="410" y1="175" x2="430" y2="175" stroke="currentColor" stroke-width="2" />
          <line x1="430" y1="175" x2="430" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="430" y1="250" x2="150" y2="250" stroke="currentColor" stroke-width="2" />
          <text x="390" y="215" font-size="10" fill="currentColor">LED</text>
        </svg>
      `
    case "common-emitter":
      return `
        <svg width="${preview ? "100%" : "500"}" height="${preview ? "100%" : "300"}" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Power Supply -->
          <rect x="50" y="50" width="30" height="60" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="40" y1="60" x2="60" y2="60" stroke="currentColor" stroke-width="3" />
          <line x1="45" y1="100" x2="55" y2="100" stroke="currentColor" stroke-width="2" />
          <text x="45" y="130" font-size="12" fill="currentColor">9V</text>
          
          <!-- Transistor -->
          <circle cx="250" cy="150" r="30" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="250" y1="120" x2="250" y2="180" stroke="currentColor" stroke-width="2" />
          <line x1="220" y1="135" x2="240" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="220" y1="165" x2="240" y2="150" stroke="currentColor" stroke-width="2" />
          <polygon points="240,150 230,140 230,160" fill="currentColor" stroke="currentColor" stroke-width="1" />
          <text x="270" y="155" font-size="12" fill="currentColor">2N3904</text>
          
          <!-- Collector Circuit -->
          <line x1="80" y1="70" x2="350" y2="70" stroke="currentColor" stroke-width="2" />
          <line x1="150" y1="70" x2="150" y2="100" stroke="currentColor" stroke-width="2" />
          <path d="M150,100 L155,100 L160,90 L170,110 L180,90 L190,110 L195,100 L200,100" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="160" y="85" font-size="10" fill="currentColor">1kΩ</text>
          <line x1="200" y1="100" x2="250" y2="100" stroke="currentColor" stroke-width="2" />
          <line x1="250" y1="100" x2="250" y2="120" stroke="currentColor" stroke-width="2" />
          
          <!-- Base Circuit -->
          <line x1="100" y1="70" x2="100" y2="150" stroke="currentColor" stroke-width="2" />
          <path d="M100,150 L105,150 L110,140 L120,160 L130,140 L140,160 L145,150 L150,150" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="110" y="135" font-size="10" fill="currentColor">10kΩ</text>
          <line x1="150" y1="150" x2="180" y2="150" stroke="currentColor" stroke-width="2" />
          
          <!-- Input Coupling -->
          <line x1="180" y1="150" x2="200" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="200" y1="140" x2="200" y2="160" stroke="currentColor" stroke-width="2" />
          <path d="M190,140 L190,160" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="180" y="175" font-size="10" fill="currentColor">10μF</text>
          <line x1="200" y1="150" x2="220" y2="150" stroke="currentColor" stroke-width="2" />
          
          <!-- Emitter Circuit -->
          <line x1="250" y1="180" x2="250" y2="200" stroke="currentColor" stroke-width="2" />
          <path d="M250,200 L255,200 L260,190 L270,210 L280,190 L290,210 L295,200 L300,200" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="260" y="185" font-size="10" fill="currentColor">100Ω</text>
          <line x1="300" y1="200" x2="300" y2="250" stroke="currentColor" stroke-width="2" />
          
          <!-- Emitter Bypass Capacitor -->
          <line x1="250" y1="200" x2="230" y2="200" stroke="currentColor" stroke-width="2" />
          <line x1="230" y1="200" x2="230" y2="220" stroke="currentColor" stroke-width="2" />
          <line x1="220" y1="220" x2="240" y2="220" stroke="currentColor" stroke-width="2" />
          <path d="M220,225 L240,225" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="230" y1="225" x2="230" y2="250" stroke="currentColor" stroke-width="2" />
          <text x="200" y="225" font-size="10" fill="currentColor">100μF</text>
          
          <!-- Output Coupling -->
          <line x1="250" y1="100" x2="320" y2="100" stroke="currentColor" stroke-width="2" />
          <line x1="320" y1="90" x2="320" y2="110" stroke="currentColor" stroke-width="2" />
          <path d="M330,90 L330,110" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="320" y="80" font-size="10" fill="currentColor">10μF</text>
          <line x1="330" y1="100" x2="350" y2="100" stroke="currentColor" stroke-width="2" />
          <text x="350" y="100" font-size="12" fill="currentColor">Output</text>
          
          <!-- Ground -->
          <line x1="50" y1="110" x2="50" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="50" y1="250" x2="350" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="230" y1="250" x2="230" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="300" y1="250" x2="300" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="170" y1="250" x2="170" y2="240" stroke="currentColor" stroke-width="2" />
          <line x1="160" y1="240" x2="180" y2="240" stroke="currentColor" stroke-width="2" />
          <line x1="165" y1="235" x2="175" y2="235" stroke="currentColor" stroke-width="2" />
          <line x1="168" y1="230" x2="172" y2="230" stroke="currentColor" stroke-width="2" />
          
          <!-- Input -->
          <text x="150" y="135" font-size="12" fill="currentColor">Input</text>
        </svg>
      `
    case "darlington-pair":
      return `
        <svg width="${preview ? "100%" : "500"}" height="${preview ? "100%" : "300"}" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Power Supply -->
          <rect x="50" y="50" width="30" height="60" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="40" y1="60" x2="60" y2="60" stroke="currentColor" stroke-width="3" />
          <line x1="45" y1="100" x2="55" y2="100" stroke="currentColor" stroke-width="2" />
          <text x="45" y="130" font-size="12" fill="currentColor">9V</text>
          
          <!-- First Transistor -->
          <circle cx="200" cy="150" r="25" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="200" y1="125" x2="200" y2="175" stroke="currentColor" stroke-width="2" />
          <line x1="175" y1="135" x2="195" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="175" y1="165" x2="195" y2="150" stroke="currentColor" stroke-width="2" />
          <polygon points="195,150 185,140 185,160" fill="currentColor" stroke="currentColor" stroke-width="1" />
          <text x="180" y="180" font-size="10" fill="currentColor">Q1</text>
          
          <!-- Second Transistor -->
          <circle cx="300" cy="200" r="25" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="300" y1="175" x2="300" y2="225" stroke="currentColor" stroke-width="2" />
          <line x1="275" y1="185" x2="295" y2="200" stroke="currentColor" stroke-width="2" />
          <line x1="275" y1="215" x2="295" y2="200" stroke="currentColor" stroke-width="2" />
          <polygon points="295,200 285,190 285,210" fill="currentColor" stroke="currentColor" stroke-width="1" />
          <text x="280" y="230" font-size="10" fill="currentColor">Q2</text>
          
          <!-- Collector Circuit -->
          <line x1="80" y1="70" x2="400" y2="70" stroke="currentColor" stroke-width="2" />
          <line x1="150" y1="70" x2="150" y2="100" stroke="currentColor" stroke-width="2" />
          <path d="M150,100 L155,100 L160,90 L170,110 L180,90 L190,110 L195,100 L200,100" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="160" y="85" font-size="10" fill="currentColor">1kΩ</text>
          <line x1="200" y1="100" x2="200" y2="125" stroke="currentColor" stroke-width="2" />
          <line x1="200" y1="100" x2="300" y2="100" stroke="currentColor" stroke-width="2" />
          <line x1="300" y1="100" x2="300" y2="175" stroke="currentColor" stroke-width="2" />
          
          <!-- Base Circuit -->
          <line x1="100" y1="70" x2="100" y2="150" stroke="currentColor" stroke-width="2" />
          <path d="M100,150 L105,150 L110,140 L120,160 L130,140 L140,160 L145,150 L150,150" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="110" y="135" font-size="10" fill="currentColor">10kΩ</text>
          <line x1="150" y1="150" x2="175" y2="150" stroke="currentColor" stroke-width="2" />
          
          <!-- Emitter-Base Connection -->
          <line x1="200" y1="175" x2="200" y2="200" stroke="currentColor" stroke-width="2" />
          <line x1="200" y1="200" x2="275" y2="200" stroke="currentColor" stroke-width="2" />
          
          <!-- Emitter Circuit -->
          <line x1="300" y1="225" x2="300" y2="250" stroke="currentColor" stroke-width="2" />
          <path d="M300,250 L305,250 L310,240 L320,260 L330,240 L340,260 L345,250 L350,250" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="310" y="235" font-size="10" fill="currentColor">100Ω</text>
          <line x1="350" y1="250" x2="350" y2="270" stroke="currentColor" stroke-width="2" />
          
          <!-- Ground -->
          <line x1="50" y1="110" x2="50" y2="270" stroke="currentColor" stroke-width="2" />
          <line x1="50" y1="270" x2="350" y2="270" stroke="currentColor" stroke-width="2" />
          <line x1="200" y1="270" x2="200" y2="260" stroke="currentColor" stroke-width="2" />
          <line x1="190" y1="260" x2="210" y2="260" stroke="currentColor" stroke-width="2" />
          <line x1="195" y1="255" x2="205" y2="255" stroke="currentColor" stroke-width="2" />
          <line x1="198" y1="250" x2="202" y2="250" stroke="currentColor" stroke-width="2" />
          
          <!-- Output -->
          <line x1="300" y1="100" x2="350" y2="100" stroke="currentColor" stroke-width="2" />
          <text x="350" y="100" font-size="12" fill="currentColor">Output</text>
          
          <!-- Input -->
          <text x="150" y="135" font-size="12" fill="currentColor">Input</text>
          
          <!-- Labels -->
          <text x="200" y="110" font-size="10" fill="currentColor">Collector</text>
          <text x="210" y="200" font-size="10" fill="currentColor">Emitter-Base</text>
          <text x="300" y="240" font-size="10" fill="currentColor">Emitter</text>
        </svg>
      `
    case "astable-multivibrator":
      return `
        <svg width="${preview ? "100%" : "500"}" height="${preview ? "100%" : "300"}" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Power Supply -->
          <rect x="50" y="50" width="30" height="60" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="40" y1="60" x2="60" y2="60" stroke="currentColor" stroke-width="3" />
          <line x1="45" y1="100" x2="55" y2="100" stroke="currentColor" stroke-width="2" />
          <text x="45" y="130" font-size="12" fill="currentColor">9V</text>
          
          <!-- Main Power Line -->
          <line x1="80" y1="70" x2="450" y2="70" stroke="currentColor" stroke-width="2" />
          
          <!-- Left Transistor -->
          <circle cx="150" cy="150" r="25" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="150" y1="125" x2="150" y2="175" stroke="currentColor" stroke-width="2" />
          <line x1="125" y1="135" x2="145" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="125" y1="165" x2="145" y2="150" stroke="currentColor" stroke-width="2" />
          <polygon points="145,150 135,140 135,160" fill="currentColor" stroke="currentColor" stroke-width="1" />
          <text x="130" y="180" font-size="10" fill="currentColor">Q1</text>

          <!-- Right Transistor -->
          <circle cx="350" cy="150" r="25" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="350" y1="125" x2="350" y2="175" stroke="currentColor" stroke-width="2" />
          <line x1="325" y1="135" x2="345" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="325" y1="165" x2="345" y2="150" stroke="currentColor" stroke-width="2" />
          <polygon points="345,150 335,140 335,160" fill="currentColor" stroke="currentColor" stroke-width="1" />
          <text x="330" y="180" font-size="10" fill="currentColor">Q2</text>
          
          <!-- Left Collector Resistor -->
          <line x1="150" y1="70" x2="150" y2="100" stroke="currentColor" stroke-width="2" />
          <path d="M150,100 L155,100 L160,90 L170,110 L180,90 L190,110 L195,100 L200,100" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="160" y="85" font-size="10" fill="currentColor">10kΩ</text>
          <line x1="200" y1="100" x2="200" y2="125" stroke="currentColor" stroke-width="2" />
          
          <!-- Right Collector Resistor -->
          <line x1="350" y1="70" x2="350" y2="100" stroke="currentColor" stroke-width="2" />
          <path d="M350,100 L355,100 L360,90 L370,110 L380,90 L390,110 L395,100 L400,100" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="360" y="85" font-size="10" fill="currentColor">10kΩ</text>
          <line x1="400" y1="100" x2="400" y2="125" stroke="currentColor" stroke-width="2" />
          
          <!-- Cross-coupling Capacitors -->
          <line x1="150" y1="100" x2="150" y2="125" stroke="currentColor" stroke-width="2" />
          <line x1="150" y1="100" x2="250" y2="100" stroke="currentColor" stroke-width="2" />
          <line x1="250" y1="100" x2="250" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="250" y1="140" x2="250" y2="160" stroke="currentColor" stroke-width="2" />
          <path d="M240,140 L240,160" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="220" y="150" font-size="10" fill="currentColor">10μF</text>
          <line x1="250" y1="150" x2="325" y2="150" stroke="currentColor" stroke-width="2" />
          
          <line x1="350" y1="100" x2="350" y2="125" stroke="currentColor" stroke-width="2" />
          <line x1="350" y1="100" x2="450" y2="100" stroke="currentColor" stroke-width="2" />
          <line x1="450" y1="100" x2="450" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="450" y1="140" x2="450" y2="160" stroke="currentColor" stroke-width="2" />
          <path d="M440,140 L440,160" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="420" y="150" font-size="10" fill="currentColor">10μF</text>
          <line x1="450" y1="150" x2="450" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="450" y1="150" x2="125" y2="150" stroke="currentColor" stroke-width="2" />
          
          <!-- Base Resistors -->
          <line x1="125" y1="150" x2="100" y2="150" stroke="currentColor" stroke-width="2" />
          <path d="M100,150 L100,155 L90,160 L110,170 L90,180 L110,190 L100,195 L100,200" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="70" y="175" font-size="10" fill="currentColor">10kΩ</text>
          <line x1="100" y1="200" x2="100" y2="250" stroke="currentColor" stroke-width="2" />
          
          <line x1="325" y1="150" x2="300" y2="150" stroke="currentColor" stroke-width="2" />
          <path d="M300,150 L300,155 L290,160 L310,170 L290,180 L310,190 L300,195 L300,200" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="270" y="175" font-size="10" fill="currentColor">10kΩ</text>
          <line x1="300" y1="200" x2="300" y2="250" stroke="currentColor" stroke-width="2" />
          
          <!-- LEDs -->
          <line x1="150" y1="175" x2="150" y2="200" stroke="currentColor" stroke-width="2" />
          <polygon points="140,200 160,220 140,240 140,200" fill="none" stroke="currentColor" stroke-width="2" />
          <circle cx="160" cy="220" r="10" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="160" y1="210" x2="160" y2="230" stroke="currentColor" stroke-width="1" stroke-dasharray="2,1" />
          <text x="140" y="255" font-size="10" fill="currentColor">LED 1</text>
          <line x1="160" y1="220" x2="160" y2="250" stroke="currentColor" stroke-width="2" />
          
          <line x1="350" y1="175" x2="350" y2="200" stroke="currentColor" stroke-width="2" />
          <polygon points="340,200 360,220 340,240 340,200" fill="none" stroke="currentColor" stroke-width="2" />
          <circle cx="360" cy="220" r="10" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="360" y1="210" x2="360" y2="230" stroke="currentColor" stroke-width="1" stroke-dasharray="2,1" />
          <text x="340" y="255" font-size="10" fill="currentColor">LED 2</text>
          <line x1="360" y1="220" x2="360" y2="250" stroke="currentColor" stroke-width="2" />
          
          <!-- Ground -->
          <line x1="50" y1="110" x2="50" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="50" y1="250" x2="400" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="100" y1="250" x2="100" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="160" y1="250" x2="160" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="300" y1="250" x2="300" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="360" y1="250" x2="360" y2="250" stroke="currentColor" stroke-width="2" />
        </svg>
      `
    case "transistor-regulator":
      return `
        <svg width="${preview ? "100%" : "500"}" height="${preview ? "100%" : "300"}" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Power Supply -->
          <rect x="50" y="50" width="30" height="60" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="40" y1="60" x2="60" y2="60" stroke="currentColor" stroke-width="3" />
          <line x1="45" y1="100" x2="55" y2="100" stroke="currentColor" stroke-width="2" />
          <text x="45" y="130" font-size="12" fill="currentColor">12V</text>
          
          <!-- Main Power Line -->
          <line x1="80" y1="70" x2="450" y2="70" stroke="currentColor" stroke-width="2" />
          
          <!-- Transistor -->
          <circle cx="300" cy="150" r="30" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="300" y1="120" x2="300" y2="180" stroke="currentColor" stroke-width="2" />
          <line x1="270" y1="135" x2="290" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="270" y1="165" x2="290" y2="150" stroke="currentColor" stroke-width="2" />
          <polygon points="290,150 280,140 280,160" fill="currentColor" stroke="currentColor" stroke-width="1" />
          <text x="320" y="155" font-size="12" fill="currentColor">2N3055</text>
          
          <!-- Collector Connection -->
          <line x1="300" y1="70" x2="300" y2="120" stroke="currentColor" stroke-width="2" />
          
          <!-- Zener Diode Circuit -->
          <line x1="150" y1="70" x2="150" y2="100" stroke="currentColor" stroke-width="2" />
          <path d="M150,100 L155,100 L160,90 L170,110 L180,90 L190,110 L195,100 L200,100" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="160" y="85" font-size="10" fill="currentColor">1kΩ</text>
          <line x1="200" y1="100" x2="220" y2="100" stroke="currentColor" stroke-width="2" />
          
          <!-- Zener Diode -->
          <line x1="220" y1="100" x2="220" y2="150" stroke="currentColor" stroke-width="2" />
          <polygon points="210,150 230,150 220,180" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="210" y1="180" x2="230" y2="180" stroke="currentColor" stroke-width="2" />
          <text x="190" y="140" font-size="10" fill="currentColor">5.1V</text>
          <line x1="220" y1="180" x2="220" y2="250" stroke="currentColor" stroke-width="2" />
          
          <!-- Base Connection -->
          <line x1="220" y1="100" x2="270" y2="100" stroke="currentColor" stroke-width="2" />
          <line x1="270" y1="100" x2="270" y2="150" stroke="currentColor" stroke-width="2" />
          
          <!-- Output Circuit -->
          <line x1="300" y1="180" x2="300" y2="200" stroke="currentColor" stroke-width="2" />
          <line x1="300" y1="200" x2="350" y2="200" stroke="currentColor" stroke-width="2" />
          <text x="320" y="190" font-size="12" fill="currentColor">Output</text>
          <text x="320" y="210" font-size="10" fill="currentColor">~4.4V</text>
          
          <!-- Load Resistor -->
          <line x1="350" y1="200" x2="350" y2="220" stroke="currentColor" stroke-width="2" />
          <path d="M350,220 L355,220 L360,210 L370,230 L380,210 L390,230 L395,220 L400,220" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="360" y="205" font-size="10" fill="currentColor">470Ω</text>
          <line x1="400" y1="220" x2="400" y2="250" stroke="currentColor" stroke-width="2" />
          
          <!-- Ground -->
          <line x1="50" y1="110" x2="50" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="50" y1="250" x2="400" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="220" y1="250" x2="220" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="400" y1="250" x2="400" y2="250" stroke="currentColor" stroke-width="2" />
        </svg>
      `
    case "light-sensor":
      return `
        <svg width="${preview ? "100%" : "500"}" height="${preview ? "100%" : "300"}" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Power Supply -->
          <rect x="50" y="50" width="30" height="60" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="40" y1="60" x2="60" y2="60" stroke="currentColor" stroke-width="3" />
          <line x1="45" y1="100" x2="55" y2="100" stroke="currentColor" stroke-width="2" />
          <text x="45" y="130" font-size="12" fill="currentColor">9V</text>
          
          <!-- Main Power Line -->
          <line x1="80" y1="70" x2="450" y2="70" stroke="currentColor" stroke-width="2" />
          
          <!-- LDR Circuit -->
          <line x1="150" y1="70" x2="150" y2="100" stroke="currentColor" stroke-width="2" />
          <circle cx="150" cy="120" r="20" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="140" y1="110" x2="160" y2="130" stroke="currentColor" stroke-width="2" />
          <line x1="140" y1="130" x2="160" y2="110" stroke="currentColor" stroke-width="2" />
          <text x="120" y="150" font-size="10" fill="currentColor">LDR</text>
          <line x1="150" y1="140" x2="150" y2="170" stroke="currentColor" stroke-width="2" />
          
          <!-- Resistor -->
          <path d="M150,170 L155,170 L160,160 L170,180 L180,160 L190,180 L195,170 L200,170" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="160" y="155" font-size="10" fill="currentColor">10kΩ</text>
          <line x1="200" y1="170" x2="200" y2="250" stroke="currentColor" stroke-width="2" />
          
          <!-- Transistor -->
          <circle cx="300" cy="150" r="25" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="300" y1="125" x2="300" y2="175" stroke="currentColor" stroke-width="2" />
          <line x1="275" y1="135" x2="295" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="275" y1="165" x2="295" y2="150" stroke="currentColor" stroke-width="2" />
          <polygon points="295,150 285,140 285,160" fill="currentColor" stroke="currentColor" stroke-width="1" />
          <text x="280" y="180" font-size="10" fill="currentColor">2N3904</text>
          
          <!-- Base Connection -->
          <line x1="150" y1="170" x2="250" y2="170" stroke="currentColor" stroke-width="2" />
          <line x1="250" y1="170" x2="250" y2="150" stroke="currentColor" stroke-width="2" />
          <line x1="250" y1="150" x2="275" y2="150" stroke="currentColor" stroke-width="2" />
          
          <!-- Emitter Connection -->
          <line x1="300" y1="175" x2="300" y2="250" stroke="currentColor" stroke-width="2" />
          
          <!-- LED Circuit -->
          <line x1="350" y1="70" x2="350" y2="100" stroke="currentColor" stroke-width="2" />
          <path d="M350,100 L355,100 L360,90 L370,110 L380,90 L390,110 L395,100 L400,100" fill="none" stroke="currentColor" stroke-width="2" />
          <text x="360" y="85" font-size="10" fill="currentColor">220Ω</text>
          <line x1="400" y1="100" x2="400" y2="120" stroke="currentColor" stroke-width="2" />
          
          <polygon points="390,120 410,140 390,160 390,120" fill="none" stroke="currentColor" stroke-width="2" />
          <circle cx="410" cy="140" r="15" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="410" y1="125" x2="410" y2="155" stroke="currentColor" stroke-width="1" stroke-dasharray="2,1" />
          <text x="390" y="180" font-size="10" fill="currentColor">LED</text>
          
          <line x1="410" y1="140" x2="430" y2="140" stroke="currentColor" stroke-width="2" />
          <line x1="430" y1="140" x2="430" y2="120" stroke="currentColor" stroke-width="2" />
          <line x1="430" y1="120" x2="300" y2="120" stroke="currentColor" stroke-width="2" />
          <line x1="300" y1="120" x2="300" y2="125" stroke="currentColor" stroke-width="2" />
          
          <!-- Ground -->
          <line x1="50" y1="110" x2="50" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="50" y1="250" x2="400" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="200" y1="250" x2="200" y2="250" stroke="currentColor" stroke-width="2" />
          <line x1="300" y1="250" x2="300" y2="250" stroke="currentColor" stroke-width="2" />
        </svg>
      `
    default:
      // For premium or other circuits, provide a basic placeholder schematic
      return `
        <svg width="${preview ? "100%" : "500"}" height="${preview ? "100%" : "300"}" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="50" width="400" height="200" rx="10" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5,5" />
          <text x="250" y="150" text-anchor="middle" dominant-baseline="middle" font-size="16" fill="currentColor">
            ${circuitId
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")} Circuit
          </text>
          <text x="250" y="180" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="currentColor">
            ${circuitId.includes("premium") ? "Premium Content" : "Schematic Available in Detail View"}
          </text>
        </svg>
      `
  }
}
