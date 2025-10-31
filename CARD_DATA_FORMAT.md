# Card Data Format

This document describes the JSON structure used to define credit cards in the wallet application.

## JSON Structure

The card data is stored in `cards-data.json` with the following structure:

```json
{
  "cards": [
    {
      "id": 1,
      "name": "Card Name",
      "bank": "BANK NAME",
      "cardNumber": "•••• •••• •••• 1234",
      "holderName": "CARD HOLDER NAME",
      "expiryDate": "MM/YY",
      "protocol": "Mastercard|Visa|American Express",
      "background": {
        "type": "color|image",
        "value": "gradient or image URL"
      }
    }
  ]
}
```

## Field Descriptions

### Required Fields

- **id** (number): Unique identifier for the card
- **name** (string): Full name/description of the card (e.g., "Chase Sapphire Preferred")
- **bank** (string): Bank or card issuer name in uppercase (e.g., "CHASE", "BANK OF AMERICA")
- **cardNumber** (string): Masked card number using bullet points (e.g., "•••• •••• •••• 4829")
- **holderName** (string): Cardholder's name in uppercase (e.g., "JOHN ANDERSON")
- **expiryDate** (string): Card expiry date in MM/YY format (e.g., "12/27")
- **protocol** (string): Card network/protocol (e.g., "Mastercard", "Visa", "American Express")
- **background** (object): Background styling for the card

### Background Object

The `background` object supports two types of card backgrounds:

#### 1. Solid Color/Gradient (type: "color")
```json
"background": {
  "type": "color",
  "value": "linear-gradient(135deg, #0066CC 0%, #0052A3 100%)"
}
```
- **type**: Must be "color"
- **value**: Any valid CSS background value (solid color, gradient, etc.)

#### 2. Image Fill (type: "image")
```json
"background": {
  "type": "image",
  "value": "card-bg.svg"
}
```
- **type**: Must be "image"
- **value**: URL or path to the background image
- The image will be automatically sized to cover the card area

## Protocol Logos

The application automatically displays the appropriate logo based on the `protocol` field:
- **Mastercard/Visa**: Overlapping circles logo
- **American Express**: "AMEX" text logo

## Example

```json
{
  "cards": [
    {
      "id": 1,
      "name": "Chase Sapphire Preferred",
      "bank": "CHASE",
      "cardNumber": "•••• •••• •••• 4829",
      "holderName": "JOHN ANDERSON",
      "expiryDate": "12/27",
      "protocol": "Mastercard",
      "background": {
        "type": "color",
        "value": "linear-gradient(135deg, #0066CC 0%, #0052A3 100%)"
      }
    },
    {
      "id": 2,
      "name": "Premium Card",
      "bank": "CITIBANK",
      "cardNumber": "•••• •••• •••• 9156",
      "holderName": "MICHAEL CHEN",
      "expiryDate": "03/28",
      "protocol": "Mastercard",
      "background": {
        "type": "image",
        "value": "card-bg.svg"
      }
    }
  ]
}
```

## Adding New Cards

To add a new card:
1. Open `cards-data.json`
2. Add a new card object to the `cards` array
3. Ensure all required fields are populated
4. Choose either "color" or "image" for the background type
5. Save the file - cards will load automatically on page refresh

## Notes

- Card numbers should be masked using the bullet character (•) for security
- Bank names and cardholder names are displayed in uppercase
- Background gradients should use the CSS linear-gradient format
- Image backgrounds should be optimized for card dimensions (aspect ratio 1:1.586)
