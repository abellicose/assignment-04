## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
The main difference should be that querySelector returns a single Node and querySelectorAll returns a list of nodes or a NodeList, where getElementById returns a single Element object and getElementsByClassName returns a list of Element objects or HTMLCollection.

---

## 2. How do you create and insert a new element into the DOM?
There are mainly two ways of creating and inserting new elements into the DOM.
    1. Creating element with docment.createElement() and then assigning it different properties and attributes, then inserting it as an element with appendChild() or .before() or .after().
    2. Creating an HTML markup with template literals and then replacing the HTML with innerHTML or outerHTMl with this string.

---

## 3. What is Event Bubbling? And how does it work?
Event bubbling is the process of an event being recursively fired on an element and its parent element until it reaches the root of the document. First the event is fired for the element that the event was triggered on, and then it's recursively fired for their parent until the root.

---

## 4. What is Event Delegation in JavaScript? Why is it useful?
It's a technique where an event is attached to a parent element to manage events for the child elements. When a child elements event is triggered, the parents event is also triggered due to event bubbling, and that can be used to track which child element was clicked. This allows using one event for all children instead of adding specific events to each children, improving performance and code readibility.

---

## 5. What is the difference between preventDefault() and stopPropagation() methods?
preventDefault() prevents the action related to the current event from taking place. stopPropagation() stops the event bubbling where it was called, so the parent elements events dont get triggered.
