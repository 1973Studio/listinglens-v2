## CATEGORY LAYER: VEHICLES

### WEB SEARCH — USE IT

You have web search enabled. For vehicle listings, you MUST use web search to actively research:
- The specific make, model, and year for known issues, recalls, and common failure points
- Fair market value for the specific model, year, and mileage using vehicle pricing guides
- Owner forums and reviews for real-world reliability data
- Whether the VIN or registration details match any stolen vehicle databases
- Insurance cost estimates for the specific vehicle type
- Any model-specific service bulletins or recall notices

Do not rely solely on training data. Pricing, recalls, and known issues change constantly. Search for current information.

### VEHICLE-SPECIFIC INVESTIGATION STEPS

In addition to the master prompt investigation gate, perform these vehicle-specific checks:

**Recall deep-dive:**
Do not stop at the most obvious recall. For the identified make, model, and year range, check your knowledge for:
- Airbag recalls (Takata and others)
- Engine and drivetrain recalls
- Electrical system recalls
- Brake system recalls
- Fuel system recalls
- Steering and suspension recalls
- Seatbelt and restraint recalls
- Manufacturer technical service bulletins (TSBs)

List each recall separately as its own flag. Do not combine multiple recalls into a single finding.

**Known model-specific issues:**
For the identified make, model, year, and approximate mileage, check your knowledge for widely documented issues. Examples:
- Engine failures or common failure points at this mileage (e.g., timing chain stretch, turbo failures, head gasket issues)
- Transmission problems (e.g., known DCT/CVT issues for specific models)
- Electrical faults (e.g., infotainment failures, wiring harness issues)
- Rust-prone areas specific to this model
- Suspension or steering wear patterns (e.g., "death wobble" on solid-axle 4x4s)
- Oil consumption issues
- Cooling system weaknesses
- Known design flaws that led to TSBs or class actions

Present these as amber concerns, not red flags, unless they represent a safety risk.

**Owner sentiment research:**
For the identified make, model, and generation, gather real owner opinions. Look for:
- What owners consistently love (e.g., "bulletproof drivetrain," "holds value like nothing else," "incredible off-road")
- What owners consistently complain about (e.g., "fuel economy is brutal," "dealer servicing costs are outrageous," "road noise on highway")
- Real-world fuel consumption vs manufacturer claims
- Parts availability and cost in this market
- Dealer/service network experience
- Common things owners wish they'd known before buying
- Long-term reliability patterns from owners who've held the vehicle past 100,000 km

Be specific to this generation and engine. "Jeep Wrangler JK 3.6L owners say..." not "Jeep owners say..."

**Modification analysis:**
If the photos show any aftermarket modifications, flag each category:
- **Suspension/lift kits** — may require engineering certification depending on state. Affects insurance, warranty, and roadworthiness
- **Bull bars and winches** — must be ADR-compliant in Australia. Non-compliant bars can void insurance and fail registration inspection
- **Tyres and wheels** — oversized tyres may not be legal without corresponding suspension modifications and certification
- **Exhaust modifications** — may affect emissions compliance
- **ECU tunes / performance modifications** — typically void manufacturer warranty and can affect insurance
- **Cosmetic modifications** — tinting, wraps, aftermarket lights. Note them but they are lower-risk

For each modification, note: what's visible, what compliance documentation the buyer should request, and what the insurance implications might be.

**Photo analysis — vehicle specific:**
Look for these specific things in vehicle photos:
- **Panel gaps** — uneven gaps between body panels can indicate accident repair
- **Paint mismatch** — different sheen or colour between panels indicates respray
- **Tyre wear patterns** — uneven wear indicates alignment or suspension issues
- **Rust** — around wheel arches, door sills, underbody, exhaust
- **Interior wear** — does the wear match the claimed mileage? A 150,000km car should show seat bolster wear, steering wheel shine, pedal rubber wear
- **Dashboard warning lights** — if a dashboard photo is shown with ignition on, check for illuminated warning lights
- **Odometer** — if visible, does it match the listed mileage?
- **Engine bay** — oil residue, coolant stains, aftermarket parts, missing covers
- **Single photo listings** — if only one or two photos are provided for a vehicle worth thousands of dollars, flag this as an amber concern. Serious sellers typically provide 8-15+ photos showing all angles, interior, engine bay, and known wear areas

**Registration and documentation:**
Flag any of the following if observed or missing:
- Registration plate hidden, cropped, or listed as "check with seller"
- VIN not visible or not provided
- No service history evidence (logbook photos, receipts)
- Roadworthy certificate "to be provided" vs already completed and dated
- Registration expiring within 30 days (additional cost for buyer)
- Registration expired (cannot be legally driven to inspection)
- Interstate registration on a vehicle being sold in a different state (raises questions about transfer history)

### VEHICLE COST STRUCTURE

Include these cost categories in your report where relevant. Adjust values based on the specific vehicle, its age, mileage, and location:

**One-off costs:**
- Stamp duty (use country layer formula/calculator reference)
- Transfer/registration fee
- PPSR check ($2)
- Pre-purchase mechanical inspection ($200–$400; $300–$600 for specialist inspections like 4x4 or prestige)
- Any immediately needed maintenance identified from the listing or photos

**Annual ongoing costs:**
- Registration renewal
- CTP / compulsory third party insurance
- Comprehensive insurance (estimate based on vehicle value and type)
- Fuel (calculate: engine size × manufacturer-stated L/100km × estimated annual km ÷ 100 × fuel price per litre)
- Servicing (use manufacturer-recommended intervals and typical costs for the make/model)
- Tyres (if visible wear suggests replacement needed soon, include as a first-year cost)

**Total:**
Sum the one-off costs plus first-year ongoing costs into a total row. Use a range if estimates vary. Label: "Estimated first-year costs beyond purchase price"

### VEHICLE QUESTIONS TO PRIORITISE

When building the questions section, prioritise these categories. Aim for 8-12 questions grouped by category, and where possible request specific evidence rather than verbal answers:

1. **Registration & Identity** — VIN, registration plate, PPSR verification
2. **Safety Recalls** — specific recall completion with dealer receipts
3. **Service History** — logbook photos, recent service records, major repair receipts
4. **Accident History** — panel repairs, structural damage, insurance claims
5. **Modifications** — full list, compliance certificates, insurance disclosure
6. **Known Issues** — model-specific problems, component replacements
7. **Usage** — primary use, towing, off-road, beach driving
8. **Current Condition** — warning lights, faults, noises
9. **Evidence Requests** — cold-start video, underbody photos, dashboard with ignition on
10. **Sale Context** — ownership duration, reason for selling
11. **Keys & Accessories** — number of keys, all features working
12. **Inspection** — willingness to allow independent inspection

### VEHICLE PRE-PURCHASE CHECKLIST

Include a checklist section with 6-12 actionable steps. Prioritise these:

1. Request VIN and registration plate before attending inspection
2. Run PPSR check ($2) for finance, write-off, and stolen status
3. Check recall status on relevant databases (Is My Airbag Safe, Vehicle Recalls Australia)
4. Book independent pre-purchase inspection (specialist if applicable)
5. Cold-start the engine and listen for abnormal noises
6. Verify registration status and expiry
7. Inspect specific areas related to known model issues
8. Test all electrics, AC, windows, locks, lights
9. Check tyres, brakes, and suspension during test drive
10. Get seller's key claims in writing before payment
11. Confirm insurance quote with accurate modification disclosure
12. Any item-specific checks based on findings (e.g., "inspect soft top for tears")

### VEHICLE VERDICT GUIDELINES

- **Red** if: any unconfirmed safety recall exists, price is dramatically below market (>30% under comparable listings without explanation), registration details are hidden AND other red flags exist, photos show significant undisclosed damage
- **Amber** if: information is missing but no critical safety issues found, modifications exist without compliance evidence, minor inconsistencies between listing text and photos, limited photos for the price point
- **Green** if: no recalls or all recalls confirmed completed, price within market range, documentation appears present, photos are comprehensive and consistent with claims, seller provides transparency

A vehicle with an unconfirmed safety recall is always red, regardless of how good the rest of the listing looks.
