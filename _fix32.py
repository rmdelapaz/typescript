import re, io

PATH = "/home/practicalace/projects/typescript/lesson_3_2_state_management_patterns.html"
with io.open(PATH, "r", encoding="utf-8", newline="") as f:
    text = f.read()

orig = text

def grab_svg(t, marker):
    i = t.index(marker)
    m = re.search(r'<svg class="svg-auto-invert".*?</svg>', t[i:], re.DOTALL)
    return m.group(0)

svg3 = grab_svg(text, "\U0001F3A8 Visualizing Prop Drilling")
svg4 = grab_svg(text, "\U0001F3A8 State Colocation: Before vs After")
svg7 = grab_svg(text, "\U0001F3A8 Data Flow Patterns Visualized")
svg4 = svg4.replace("<!-- Benefits */", "<!-- Benefits -->")

# ---------- Section 2: replace corrupted mermaid+canvas region ----------
SEC2_NEW = '''<h3>How Lifting State Works</h3>
                <p>Once state is lifted, the parent becomes the single <strong>source of truth</strong>. Each child receives the current value as a prop and asks for changes by calling a callback the parent handed down. Here is the full round trip when a user types in the Celsius field:</p>
                <pre class="mermaid">
sequenceDiagram
    participant User
    participant Celsius as CelsiusInput
    participant Parent as TemperatureConverter
    participant Fahrenheit as FahrenheitInput
    User->>Celsius: Types 25 into the field
    Celsius->>Parent: Calls onTemperatureChange
    Parent->>Parent: Updates state and converts
    Parent->>Celsius: Re-renders showing 25 C
    Parent->>Fahrenheit: Re-renders showing 77 F
    Fahrenheit->>User: Displays 77 Fahrenheit
    Note over Parent: The parent is the single source of truth
</pre>

                <h3>Data Flows Down, Events Flow Up</h3>
                <figure>
                    <svg class="svg-auto-invert" viewBox="0 0 640 330" width="100%" style="max-width: 640px;" role="img" aria-labelledby="liftfig-title liftfig-desc">
                        <title id="liftfig-title">Lifting state up in the temperature converter</title>
                        <desc id="liftfig-desc">The parent TemperatureConverter owns the temperature state and passes it down to two child inputs as props, while the children send updates back up through a callback.</desc>
                        <rect x="170" y="30" width="300" height="72" rx="10" fill="#eef0ff" stroke="#667eea" stroke-width="2"/>
                        <text x="320" y="58" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#4a3f9f">TemperatureConverter (Parent)</text>
                        <text x="320" y="82" text-anchor="middle" font-family="monospace" font-size="11" fill="#555">useState(temperature) - source of truth</text>
                        <rect x="40" y="215" width="220" height="82" rx="10" fill="#e3f2fd" stroke="#2196F3" stroke-width="2"/>
                        <text x="150" y="243" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#1565C0">CelsiusInput</text>
                        <text x="150" y="272" text-anchor="middle" font-family="system-ui, sans-serif" font-size="19" font-weight="bold" fill="#1565C0">25 &#176;C</text>
                        <rect x="380" y="215" width="220" height="82" rx="10" fill="#fff3e0" stroke="#FF9800" stroke-width="2"/>
                        <text x="490" y="243" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#e65100">FahrenheitInput</text>
                        <text x="490" y="272" text-anchor="middle" font-family="system-ui, sans-serif" font-size="19" font-weight="bold" fill="#e65100">77 &#176;F</text>
                        <defs>
                            <marker id="lift-down" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0, 9 3.5, 0 7" fill="#4CAF50"/></marker>
                            <marker id="lift-up" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0, 9 3.5, 0 7" fill="#2196F3"/></marker>
                        </defs>
                        <line x1="250" y1="102" x2="160" y2="210" stroke="#4CAF50" stroke-width="2.5" marker-end="url(#lift-down)"/>
                        <text x="150" y="160" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#2e7d32">temperature prop</text>
                        <line x1="390" y1="102" x2="480" y2="210" stroke="#4CAF50" stroke-width="2.5" marker-end="url(#lift-down)"/>
                        <text x="500" y="160" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#2e7d32">temperature prop</text>
                        <line x1="205" y1="210" x2="288" y2="105" stroke="#2196F3" stroke-width="2.5" stroke-dasharray="5,3" marker-end="url(#lift-up)"/>
                        <text x="230" y="192" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#1565C0">onChange callback</text>
                        <text x="320" y="320" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-style="italic" fill="#666">One value in the parent keeps both inputs perfectly in sync.</text>
                    </svg>
                    <figcaption>Figure 1: The parent owns the temperature. Props flow down to both inputs; a callback carries edits back up. Because there is a single source of truth, the two fields can never disagree.</figcaption>
                </figure>'''

text, n = re.subn(r'<h3>How Lifting State Works</h3>.*?</pre>', lambda m: SEC2_NEW, text, count=1, flags=re.DOTALL)
assert n == 1, "sec2 fail"

# ---------- Section 2 green paragraph ----------
text = text.replace(
 '<p style="color: #4CAF50;">✅ Now they stay synchronized through the parent!</p>',
 '<p><strong>✅ Now they stay synchronized</strong> - both inputs read from and write to a single value in the parent, so they can never drift apart.</p>')

# ---------- Section 3: remove SVG from table, add figure, add ctx note ----------
text, n = re.subn(
  r'<td>Verbose code</td>\s*<h3>\U0001F3A8 Visualizing Prop Drilling</h3>\s*<svg class="svg-auto-invert".*?</svg>\s*<td>Every intermediate component needs prop definitions</td>',
  '<td>Verbose code</td>\n                            <td>Every intermediate component needs prop definitions</td>',
  text, count=1, flags=re.DOTALL)
assert n == 1, "sec3 table fail"

SEC3_FIG = ('<h3>Visualizing Prop Drilling</h3>\n                <figure>\n                    '
  + svg3 +
  '\n                    <figcaption>Figure 2: The <code>user</code> object is threaded through four components that never touch it, just to reach <code>Author</code> at the bottom. Composition, Context, or restructuring can remove those middlemen.</figcaption>\n                </figure>')
text, n = re.subn(r'<h3>Solutions to Prop Drilling</h3>', SEC3_FIG + '\n\n                <h3>Solutions to Prop Drilling</h3>', text, count=1)
assert n == 1, "sec3 fig fail"

SEC3_CTX = '''<div class="card card-info">
                    <h4>\U0001F4A1 React 19 makes Context nicer</h4>
                    <p>Two recent quality-of-life upgrades you will see in modern codebases:</p>
                    <ul>
                        <li>You can render the context object <em>directly</em> as the provider - <code>&lt;UserContext value={user}&gt;</code> - instead of <code>&lt;UserContext.Provider&gt;</code>.</li>
                        <li>The new <code>use(UserContext)</code> hook reads context and, unlike <code>useContext</code>, may even be called conditionally.</li>
                    </ul>
                    <p>We will cover Context properly in Module 5 - for now, just know it exists to skip prop drilling for genuinely global data like the current user or theme.</p>
                </div>'''
text, n = re.subn(r'<div class="card card-warning">\s*<h4>⚠️ When is Prop Drilling Okay\?</h4>',
  SEC3_CTX + '\n\n                <div class="card card-warning">\n                    <h4>⚠️ When is Prop Drilling Okay?</h4>',
  text, count=1)
assert n == 1, "sec3 ctx fail"

# ---------- Section 4: remove SVG from table (fix row close), add figure ----------
text, n = re.subn(
  r"(<td>Parents don't manage irrelevant state</td>)\s*<h3>\U0001F3A8 State Colocation: Before vs After</h3>\s*<svg class=\"svg-auto-invert\".*?</svg>\s*</tbody>",
  r"\1" + "\n                        </tr>\n                    </tbody>",
  text, count=1, flags=re.DOTALL)
assert n == 1, "sec4 table fail"

SEC4_FIG = ('<h3>State Colocation: Before vs After</h3>\n                <figure>\n                    '
  + svg4 +
  '\n                    <figcaption>Figure 3: Hoisting the accordion panel state into <code>App</code> forces unrelated siblings to re-render and drags props through the tree. Colocating it inside <code>Accordion</code> keeps the update local - only one component re-renders.</figcaption>\n                </figure>')
text, n = re.subn(r'<h3>Real-World Example: Modal Dialog</h3>', SEC4_FIG + '\n\n                <h3>Real-World Example: Modal Dialog</h3>', text, count=1)
assert n == 1, "sec4 fig fail"

# ---------- Section 5: remove canvas demo from table, add ts-demo ----------
text, n = re.subn(
  r'(<td><code>const total = items\.reduce\(\.\.\.\)</code></td>\s*</tr>)\s*<h3>\U0001F3AE Interactive Demo: Derived State in Action</h3>.*?</script>\s*(<tr>\s*<td>Boolean check</td>)',
  r'\1' + '\n                        ' + r'\2',
  text, count=1, flags=re.DOTALL)
assert n == 1, "sec5 table fail"

SEC5_DEMO = '''<h3>Store It or Derive It?</h3>
                <p>Click each snippet below. TypeScript compiles them all - but only some are <em>good</em> state design. The real question is never "does it run?" - it is "can this get out of sync?"</p>
                <div class="card ts-demo" aria-live="polite">
                    <p class="ts-demo-sig"><code>const [items, setItems] = useState&lt;CartItem[]&gt;([]);</code></p>
                    <div class="ts-demo-buttons">
                        <button type="button" class="ts-demo-btn" data-good="true" data-msg="items.length is recomputed on every render, so it can never disagree with the array.">const count = items.length</button>
                        <button type="button" class="ts-demo-btn" data-good="true" data-msg="reduce() derives the total from the source of truth each render - always correct.">const total = items.reduce(...)</button>
                        <button type="button" class="ts-demo-btn" data-good="false" data-msg="A second useState duplicates data you already have. Now every add or remove must update two places or they drift apart.">const [count, setCount] = useState(0)</button>
                        <button type="button" class="ts-demo-btn" data-good="false" data-msg="Storing the total means every mutation must remember to call setTotalPrice too. Forget once and the cart lies about its price.">const [totalPrice, setTotalPrice] = useState(0)</button>
                    </div>
                    <p class="ts-demo-result ts-demo-idle" id="derived-demo-result">\U0001F446 Click a snippet to see whether it is derived or redundant state.</p>
                </div>
                <script>
                (function () {
                    const result = document.getElementById('derived-demo-result');
                    if (!result) return;
                    const wrap = result.closest('.ts-demo');
                    wrap.querySelectorAll('.ts-demo-btn').forEach(function (btn) {
                        btn.addEventListener('click', function () {
                            const good = btn.getAttribute('data-good') === 'true';
                            const msg = btn.getAttribute('data-msg');
                            result.classList.remove('ts-demo-idle', 'ts-demo-ok', 'ts-demo-err');
                            result.classList.add(good ? 'ts-demo-ok' : 'ts-demo-err');
                            result.textContent = (good ? '✅ Derive it: ' : '⚠️ Redundant state: ') + msg;
                        });
                    });
                })();
                </script>'''
text, n = re.subn(r'<h3>Real Example: Todo List with Filters</h3>', SEC5_DEMO + '\n\n                <h3>Real Example: Todo List with Filters</h3>', text, count=1)
assert n == 1, "sec5 demo fail"

# ---------- Section 7: remove SVG from code block, add figure ----------
text, n = re.subn(
  r'    return \(\n\s*<h3>\U0001F3A8 Data Flow Patterns Visualized</h3>\s*<svg class="svg-auto-invert".*?</svg>\s*&lt;div&gt;',
  '    return (\n        &lt;div&gt;',
  text, count=1, flags=re.DOTALL)
assert n == 1, "sec7 code fail"

SEC7_FIG = ('<h3>Visualizing Data Flow</h3>\n                <figure>\n                    '
  + svg7 +
  '\n                    <figcaption>Figure 5: Data flows down as props (green) and events flow up as callbacks (blue); the parent then re-renders the display sibling. Siblings never talk to each other directly - the parent coordinates every update.</figcaption>\n                </figure>')
text, n = re.subn(r'<h3>Pattern 4: Render Props</h3>', SEC7_FIG + '\n\n                <h3>Pattern 4: Render Props</h3>', text, count=1)
assert n == 1, "sec7 fig fail"

# ---------- Section 1: add state-structure card ----------
SEC1_CARD = '''<h3>Structuring State Well</h3>
                <div class="card card-info">
                    <h4>\U0001F4A1 Four rules for shaping state</h4>
                    <ul>
                        <li><strong>Group related state.</strong> If two values always change together (like <code>x</code> and <code>y</code>), store them as one object instead of two separate states.</li>
                        <li><strong>Avoid redundant state.</strong> If a value can be computed from props or other state during render, do not put it in <code>useState</code> at all - derive it (more on this soon).</li>
                        <li><strong>Avoid duplication.</strong> Do not copy the same data into two states; keep one source of truth and reference it everywhere else.</li>
                        <li><strong>Normalize big collections.</strong> For long lists you update often, store items keyed by <code>id</code> (a lookup object) rather than scanning an array on every change.</li>
                    </ul>
                    <p>These come straight from the React docs' "Choosing the State Structure" guidance - they head off the classic bugs where two pieces of state quietly fall out of sync.</p>
                </div>'''
anchor1 = "<p>Water (state) flows down from trunk to branches to leaves, but never sideways!</p>\n                </div>\n            </section>"
assert anchor1 in text, "sec1 anchor fail"
text = text.replace(anchor1,
  "<p>Water (state) flows down from trunk to branches to leaves, but never sideways!</p>\n                </div>\n\n                " + SEC1_CARD + "\n            </section>", 1)

# ---------- card-accent inline color strips ----------
text = text.replace('<h4 style="color: white;">', '<h4>')
text = text.replace('<h3 style="color: white;">', '<h3>')
text = text.replace('<p style="color: white;">', '<p>')
text = text.replace('<ul style="color: white;">', '<ul>')
text = text.replace('<blockquote style="border-left: 4px solid #667eea; padding-left: 1rem; margin: 1rem 0; font-style: italic;">', '<blockquote>')

# ---------- mermaid label quoting ----------
text = text.replace("C[Sibling 1] -.Can't talk directly.-> D[Sibling 2]", "C[Sibling 1] -.Cannot talk directly.-> D[Sibling 2]")
text = text.replace('A[Need to add data] --> B{Can it be calculated?}', 'A[Need to add data] --> B{"Can it be calculated?"}')
text = text.replace("B -->|Yes| C[Don't store it!<br/>Derive it instead]", 'B -->|Yes| C["Don\'t store it!<br/>Derive it instead"]')
text = text.replace('B -->|No| D{How many components<br/>need it?}', 'B -->|No| D{"How many components<br/>need it?"}')
text = text.replace('D -->|One| E[Local state in<br/>that component]', 'D -->|One| E["Local state in<br/>that component"]')
text = text.replace('D -->|Many/distant| G[Consider Context<br/>or global state]', 'D -->|Many/distant| G["Consider Context<br/>or global state"]')

# ---------- checks ----------
assert 'canvas' not in text, "canvas remains"
assert 'style="color: white' not in text, "color white remains"
assert 'class="auto-invert"' not in text
assert text.rstrip().endswith('</html>')

with io.open(PATH, "w", encoding="utf-8", newline="") as f:
    f.write(text)

print("OK changed" if text != orig else "NOCHANGE")
print("len", len(text))
print("mermaid_count", text.count('class="mermaid"'))
print("ts-demo_count", text.count('ts-demo-result'))
print("figure_count", text.count('<figure>'))
