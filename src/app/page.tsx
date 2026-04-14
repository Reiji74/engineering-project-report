"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Copy, Linkedin, Upload, MessageCircle } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"

const headingFont = "font-[Inter]"

function SectionCard({ title, text, showImage = true, children }: { title: string; text?: string | string[]; showImage?: boolean; children?: React.ReactNode }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className={`text-lg ${headingFont}`}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {text && (
          Array.isArray(text) ? (
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {text.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{text}</p>
          )
        )}
        {children}
        {showImage && (
          <div className="w-full aspect-video bg-muted border border-border rounded-md flex items-center justify-center">
            <span className="text-sm text-muted-foreground">Image Placeholder</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ProfileBox() {
  const [image, setImage] = useState<string | null>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-6 p-6 border border-border rounded-lg bg-card">

      <div className="flex flex-col items-center gap-2">
        <div className="w-28 h-28 bg-muted border border-border rounded-md flex items-center justify-center overflow-hidden">
          {image ? (
            <img src={image} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-muted-foreground">Image</span>
          )}
        </div>

        <label className="cursor-pointer text-sm text-primary flex items-center gap-1">
          <Upload className="w-4 h-4" /> Upload
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
      </div>

      <div className="flex flex-col justify-center gap-2">
        <h3 className={`text-lg font-semibold ${headingFont}`}>Name</h3>
        <p className="text-sm text-muted-foreground">Role</p>

        <div className="flex gap-4 pt-2">
          <a href="#" className="flex items-center gap-1 text-primary hover:underline text-sm">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>

          <a href="#" className="flex items-center gap-1 text-primary hover:underline text-sm">
            <MessageCircle className="w-4 h-4" /> Threads
          </a>
        </div>
      </div>

    </div>
  )
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const copy = async () => {
    await navigator.clipboard.writeText(code)
  }

  return (
    <div className="border border-border rounded-md overflow-hidden">
      <div className="flex items-center justify-between bg-muted px-4 py-2 text-sm">
        <span className="font-mono text-muted-foreground">{language}</span>
        <Button variant="secondary" size="sm" onClick={copy} className="gap-1">
          <Copy className="w-4 h-4" /> Copy
        </Button>
      </div>

      <SyntaxHighlighter language="cpp" style={oneLight} customStyle={{ margin: 0, padding: "16px", background: "transparent" }}>
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export default function Home() {
  const [module, setModule] = useState("sensor")
  const [activeTab, setActiveTab] = useState("background")

  const objectives = [
    "Design and implement a DC motor speed controller using the NUCLEO-F401RE/F411RE board in the ARM Mbed environment.",
    "Interface a Bourns 10K trimpot as an analog input for continuous motor speed adjustment via ADC and PWM output.",
    "Demonstrate a functional fan speed control prototype that integrates hardware and software into a complete embedded system."
  ]

  const problemStatements = [
    "Conventional motor control methods lack real-time feedback, making it difficult to maintain a desired speed under varying load conditions.",
    "Without an automated control system, motors may run at fixed speeds, leading to unnecessary energy consumption and reduced system efficiency.",
    "Existing simple motor circuits do not support programmable control logic, limiting their adaptability in real-world embedded system applications."
  ]

  const limitations = [
    {
      title: "Resolution of Control",
      text: "The precision of motor speed is limited by the 8-bit or 10-bit resolution of the ADC when reading the potentiometer and the PWM duty cycle granularity."
    },
    {
      title: "Voltage Drop",
      text: "The L298N motor driver has an internal voltage drop (typically 1.5V to 2V), meaning the motor will not receive the full 12V from the battery."
    },
    {
      title: "Open-Loop System",
      text: "The current design lacks a feedback mechanism (like an encoder); therefore, the system cannot automatically compensate for speed changes caused by varying physical loads."
    },
    {
      title: "Thermal Constraints",
      text: "The L298N driver generates significant heat during prolonged operation at high currents, potentially requiring passive or active cooling to maintain stability."
    },
    {
      title: "Power Supply Dependency",
      text: "As the 12V battery discharges, the maximum achievable motor speed will decrease, as the system relies on the raw battery voltage for the power stage."
    }
  ]

  const interfacingText = `Hardware components communicate through ADC, PWM, and I2C interfaces.`

  const testingProcedures = `The system was tested by adjusting the trimpot and observing motor speed.`

  const observedOutput = `Motor speed changed smoothly according to potentiometer position.`

  const achievements = `Successfully demonstrated real-time fan speed control using embedded firmware.`

  const aboutText = `This website was created as part of our final project for the Microprocessors & Computer Architecture course at Universiti Teknologi PETRONAS.`

  const moduleDescriptions: Record<string, string | string[]> = {
    sensor: [
      "This module utilizes the ADC peripheral to sample the analog voltage from the potentiometer.",
      "The raw 12-bit digital value (ranging from 0 to 4095) is read periodically to detect changes in the user's input.",
      "The captured ADC values are used to update motor speed control in real time."
    ],
    processing: "Converts ADC value to usable control signal.",
    control: "Adjusts PWM duty cycle.",
    display: "Handles display feedback."
  }

  const codeSnippet = `#include "mbed.h"
#include "Adafruit_SSD1306.h" // Must be added to your Keil Studio project!

// ==========================================
// 1. I2C & OLED Display Setup
// ==========================================
I2C i2c(PB_9, PB_8); // SDA, SCL
// Initialize OLED: I2C bus, Reset pin (NC = Not Connected), I2C Address (usually 0x78 or 0x3C), Height, Width
Adafruit_SSD1306_I2c oled(i2c, NC, 0x78, 64, 128); 

// ==========================================
// 2. Sensor Input
// ==========================================
AnalogIn pot(PA_0);

// ==========================================
// 3. Actuator & Motor Control
// ==========================================
PwmOut motorSpeed(PA_8);     
DigitalOut motorDir1(PB_10); 
DigitalOut motorDir2(PB_4);  

// ==========================================
// 4. LED Indicators
// ==========================================
DigitalOut ledBlue(PA_5);    // Normal Speed
DigitalOut ledYellow(PA_6);  // High Speed

int main() {
    // Set motor to spin forward
    motorDir1 = 1;
    motorDir2 = 0;
    
    // Set PWM frequency for the L298N
    motorSpeed.period(0.01f); 
    
    // Initialize the OLED Display
    oled.begin();
    oled.clearDisplay();
    oled.display();

    while (true) {
        // Read Potentiometer
        float currentSpeed = pot.read(); 
        motorSpeed.write(currentSpeed);
        
        // Reset LEDs
        ledBlue = 0;
        ledYellow = 0;
        
        // Clear the screen for the new loop
        oled.clearDisplay();
        oled.setTextCursor(0, 0);
        oled.printf("STM32 Motor Control\n");
        oled.printf("-------------------\n");
        
        // Calculate percentage for the display
        int speedPercent = (int)(currentSpeed * 100);
        oled.printf("Speed: %d %%\n\n", speedPercent);
        
        // Control Logic & Display Status
        if (currentSpeed < 0.1f) {
            oled.printf("Status: STOPPED");
        }
        else if (currentSpeed >= 0.1f && currentSpeed < 0.7f) {
            ledBlue = 1;       
            oled.printf("Status: NORMAL");
        } 
        else if (currentSpeed >= 0.7f) {
            ledYellow = 1;     
            oled.printf("Status: HIGH SPEED!");
        }
        
        // Push the text to the physical screen
        oled.display();
        
        // Sleep to prevent screen flickering and processor hogging
        thread_sleep_for(100); 
    }
}`

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        <header className="mb-10">
          <h1 className={`text-3xl font-semibold ${headingFont}`}>Fan Speed Controller</h1>
          <p className="text-muted-foreground">Embedded system project documentation</p>
        </header>

        <div className="w-full">
          {/* Tab Buttons */}
          <div className="bg-secondary rounded-md p-1 flex flex-wrap gap-1 mb-6">
            {[
              { id: "background", label: "Background" },
              { id: "hardware", label: "Hardware Design" },
              { id: "firmware", label: "Firmware" },
              { id: "outcomes", label: "Outcomes" },
              { id: "next", label: "What's Next" },
              { id: "about", label: "About" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={(e) => {
                  e.preventDefault()
                  console.log("Tab clicked:", tab.id)
                  setActiveTab(tab.id)
                }}
                type="button"
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-background text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-8 space-y-6">
            {activeTab === "background" && (
              <>
                <SectionCard title="Project Objectives" text={objectives} showImage={false} />

                <SectionCard title="Problem Statements" showImage={false}>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {problemStatements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </SectionCard>

                <SectionCard title="Project Limitations" showImage={false}>
                  <div className="space-y-3">
                    {limitations.map((item, i) => (
                      <div key={i}>
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="text-muted-foreground">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </>
            )}

            {activeTab === "hardware" && (
              <>
                <SectionCard title="Block Diagram" />
                <SectionCard title="Hardware Architecture" />
                <SectionCard title="Hardware Interfacing" text={interfacingText} showImage={false} />
              </>
            )}

            {activeTab === "firmware" && (
              <>
                <SectionCard title="Major Software Modules" showImage={false}>
                  <Select value={module} onValueChange={setModule}>
                    <SelectTrigger className="w-full max-w-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sensor">Sensor Data Acquisition</SelectItem>
                      <SelectItem value="processing">Signal Processing</SelectItem>
                      <SelectItem value="control">Control Logic</SelectItem>
                      <SelectItem value="display">Display Handling</SelectItem>
                    </SelectContent>
                  </Select>
                  {Array.isArray(moduleDescriptions[module]) ? (
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground mt-4">
                      {(moduleDescriptions[module] as string[]).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground mt-4">{moduleDescriptions[module]}</p>
                  )}
                </SectionCard>

                <SectionCard title="Code Snippets" showImage={false}>
                  <CodeBlock language="C++" code={codeSnippet} />
                </SectionCard>
              </>
            )}

            {activeTab === "outcomes" && (
              <>
                <SectionCard title="Testing Procedures" text={testingProcedures} showImage={false} />
                <SectionCard title="Observed Output" text={observedOutput} />
                <SectionCard title="Project Achievements" text={achievements} showImage={false} />
              </>
            )}

            {activeTab === "next" && (
              <>
                <SectionCard title="Future Improvements" text="Further enhancements can include wireless control." showImage={false} />
              </>
            )}

            {activeTab === "about" && (
              <>
                <SectionCard title="About This Website" text={aboutText} showImage={false} />
                <div className="grid md:grid-cols-2 gap-6">
                  <ProfileBox />
                  <ProfileBox />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
