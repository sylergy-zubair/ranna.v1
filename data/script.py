import re
import json

# The full FAQ text, using the summary as our source
faq_text = '''# FAQ  FAQ -- Ranna

## 1. About Ranna

**What does Ranna mean?**
The word Ranna originated from Bangladesh and means cooking. Two friends came together over three months in 2013 and decided that Ranna was the straight-to-the-point name to represent their vision and cuisine culture.

**What are the Core Values of Ranna?**
1. Quality -- Every dish is made with fresh, carefully sourced ingredients and precise cooking methods to ensure excellence.
2. Customer Service -- We go the extra mile to make every interaction warm, respectful, and memorable.
3. Cleanliness -- Our kitchens undergo strict daily checks to maintain top hygiene and safety standards.
4. Time -- We value your time, preparing and delivering food promptly without compromising quality.

## 2. Cuisine & Menu
**What type of cuisine do you serve?**
We specialise in authentic Indian cuisine, offering dishes from across the Indian subcontinent, including vegetarian, vegan, meat and fish options.
**Do you offer vegetarian and vegan options?**
Yes! Our menu has a wide range of vegetarian and vegan dishes, clearly marked for easy selection. If you have dietary restrictions, please let us know.
**How do you prepare food for vegan customers?**
We use separate gravy without cream, milk, or yogurt. We substitute in boiled rice for pilau rice (as pilau contains ghee). Vegan dishes may differ slightly in taste but remain high in quality and flavour.
**What is the difference between vegan and vegetarian at Ranna?**
Vegetarian dishes may include dairy or eggs. Vegan dishes exclude all animal products, including dairy, eggs, honey and the like.
**What is Quorn, and how do you use it?**
Quorn is a high-protein, meat-free alternative made from mycoprotein, often used in place of meat. At Ranna, we offer several Quorn-based dishes, listed in our menu.
**Is your food spicy?**
Spice levels vary by dish, but you can request your preferred spice level when ordering. If unsure, our team can recommend dishes for you.
**Do you accommodate dietary restrictions?**
Yes, we offer vegetarian, vegan, and gluten-free options. Please tell us about any requirements when ordering. Our menu also clearly marks dietary options.
**Can I customise my dish?**
Absolutely! We accommodate ingredient substitutions and dietary needs whenever possible. Some customisations may have extra charges, which staff will confirm before completing your order.
**What is the difference between vegan and vegetarian set meals?**
Vegetarian set meals may include dairy-based dishes like paneer cheese or raita yoghurt. Vegan set meals exclude all animal products and are prepared with separate gravies where needed.
**What items are gluten-free?**
Many curries, biryanis, rice, and tandoori dishes are gluten-free. Please check our menu or inform staff when ordering so we can guide you.
**How does Ranna handle food allergies and intolerances?**
We take allergies seriously. Our menu highlights the 14 main allergens, and our staff can advise on suitable dishes. However, all food is prepared in kitchens where allergens are present, so cross-contamination may occur.
**What if I have an allergy?**
Always inform staff immediately when ordering. While we take precautions, we cannot guarantee 100% allergen-free meals due to airborne contamination. If you are highly sensitive, we recommend not ordering.
**What desserts, drinks, and raita do you offer?**
We offer traditional desserts, refreshing drinks, and varieties of raita yoghurt such as cucumber or onion. Options may vary - please check our menu.
**What is a Combi Meal?**
A Combi Meal combines multiple dishes into one set, offering better value and variety. Ideal for sharing or trying different items without ordering full portions.

## 3. Dining & Reservations
**Can I make a reservation?**
Yes, you can book a table online or by phone. Note: two branches are takeaway-only and don't accept reservations.
**Do you sell alcohol, or can I bring my own?**
No, we don't serve or allow alcohol in the premises. Some restaurants serve refreshing mocktails instead.
**Can I host a private event at your restaurant?**
Yes, we cater private events. Please email customerservice@ranna.co.uk to discuss requirements.
**When are you closed during the year?**
We are closed on Christmas Day and two Eid days. Some sites may remain open, so please confirm with your local branch.
**What are your hours of operation?**
Most branches are open from 4pm to 11pm daily, though hours may vary by location.

## 4. Ordering & Delivery
**Do you offer takeout and delivery services?**
Yes, we provide both takeaway and delivery. Please check our website for delivery zones and charges.
'''

section_pattern = r"##\s*([0-9A-Za-z &]+)\n([\s\S]*?)(?=(##|$))"
sections = re.findall(section_pattern, faq_text)
faq_sections = []
for section_title, section_content, _ in sections:
    section_obj = {"Title": section_title.strip(), "questions": []}
    qa_pairs = re.findall(r"\*\*([^*]+)\*\*\n?(.*?)(?=\*\*|$)", section_content, re.DOTALL)
    for q, a in qa_pairs:
        if (q.lower().startswith("what are the core values of ranna")):
            a = [
                "Quality -- Every dish is made with fresh, carefully sourced ingredients and precise cooking methods to ensure excellence.",
                "Customer Service -- We go the extra mile to make every interaction warm, respectful, and memorable.",
                "Cleanliness -- Our kitchens undergo strict daily checks to maintain top hygiene and safety standards.",
                "Time -- We value your time, preparing and delivering food promptly without compromising quality."
            ]
        section_obj["questions"].append({"question": q.strip(), "answer": a.strip() if type(a)==str else a})
    faq_sections.append(section_obj)

with open("Ranna_FAQ_complete.json", "w", encoding="utf-8") as f:
    json.dump(faq_sections, f, indent=2, ensure_ascii=False)

"Ranna_FAQ_complete.json created successfully."