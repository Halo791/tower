# **App Name**: Malang Tower Locator

## Core Features:

- Tower Location Display: Display tower locations on a map of Malang Regency, using data from Firebase Storage. Include tower height, district, village, longitude, latitude, provider name, tower owner name, and owner's phone number.
- Role-Based Access Control: Implement role-based access (superadmin, provider, tower owner) via a sidebar menu. Firebase Authentication is not supported by the environment, so roles will have to be mock implemented. Superadmin mock users will be able to view all towers and details. Provider mock users will only view those from their tower.
- Data filtering: Provide filtering functionality on the map for tower details such as height, district, provider, owner.
- Mock Tower Data from Firebase: Serve tower data from mock Firebase Storage files with the structure including height, district, village, longitude, latitude, provider name, tower owner name, and owner's phone number.
- Predictive maintenance AI: The AI "tool" will allow users to perform predictive maintenance using historical and real-time data from similar towers.

## Style Guidelines:

- Primary color: A deep, earthy green (#4CAF50), evoking a sense of natural connection to the landscape.
- Background color: A very light, desaturated green (#F1F8E9), providing a clean and calming backdrop.
- Accent color: A vibrant, contrasting orange (#FF9800), used for interactive elements and points of interest on the map.
- Font pairing: 'Inter' (sans-serif) for both headlines and body text, offering a clean and modern look suitable for maps and data-rich applications.
- Use simple, geometric icons to represent tower locations and filter options. The style will be minimalist to reduce visual clutter.
- A clean, map-centric layout with a collapsible sidebar for role-based controls and filters. Prioritize the map display area for immediate tower location visualization.
- Smooth transitions for map zooming and sidebar interactions. Use subtle animations to highlight tower locations and filter selections.