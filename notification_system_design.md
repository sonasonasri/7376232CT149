# Stage 1

## My Approach - Priority Inbox

I thought about this problem simply - not all notifications are equal.
A placement drive is more urgent than a college event.

### How I decided priority

I gave each type a number based on importance:
- Placement → 3 (most important, affects career)
- Result → 2 (students need to know marks)
- Event → 1 (good to know, not urgent)

### What I built

When notifications load from the API, I sort them by this number.
If two notifications have same type, the newer one comes first.
User can pick top 10, 15, or 20 to display.

### Why this works

No extra database needed.
The sorting happens in the browser itself using JavaScript array sort.
Every time page loads, fresh data comes from the API and gets sorted.

### What I would improve with more time

- Save read/unread status to localStorage
- Add search by keyword
- Show notification count as badge