# Coinmena Front-end react developer task

## As stated in the documentation I have used the following:
* TypeScript
* react-query when fetching data from API
* zustend and react reducer for state-management
* tailwindcss for styling
* React memo for caching coin images for better performance
* headless UI for dialogs, comboboxes, and ...



## Note
* The login form is valid for any email and password (just for test purposes).
* Every 5-second assets price are being updated in the assets table and trade page.
* The asset API lacks sort functionality (it only sorts by id), so the sort is handled locally.
* Tailwind is only used for styling and all components are either basic or headless UI ones.
* Assets combobox in the trade page fetches 100 assets for testing purposes and it would be better to create a modal for selecting and loading more assets as well.
