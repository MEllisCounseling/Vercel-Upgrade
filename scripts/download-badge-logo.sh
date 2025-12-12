#!/bin/bash

# Download and optimize a badge logo
# Usage: ./scripts/download-badge-logo.sh <github-raw-url> <output-filename>
# Example: ./scripts/download-badge-logo.sh https://raw.githubusercontent.com/EllisIslandLab/Power_of_the_Prompt/main/public/favicon-logo.png wla-logo.png

if [ $# -lt 1 ]; then
    echo "Usage: $0 <github-raw-url> [output-filename]"
    echo ""
    echo "Example:"
    echo "  $0 https://raw.githubusercontent.com/EllisIslandLab/Power_of_the_Prompt/main/public/favicon-logo.png wla-logo.png"
    echo ""
    echo "If output filename is not provided, it will be extracted from the URL."
    exit 1
fi

URL="$1"
OUTPUT_FILENAME="${2:-$(basename "$URL")}"
OUTPUT_PATH="public/images/$OUTPUT_FILENAME"

echo "📥 Downloading badge logo from: $URL"
curl -L "$URL" -o "$OUTPUT_PATH" --progress-bar

if [ ! -f "$OUTPUT_PATH" ]; then
    echo "❌ Failed to download the image"
    exit 1
fi

FILE_SIZE=$(du -h "$OUTPUT_PATH" | cut -f1)
echo "✅ Downloaded successfully ($FILE_SIZE)"

# Get file info
echo "📋 File info:"
file "$OUTPUT_PATH"

echo ""
echo "✨ Badge logo ready at: $OUTPUT_PATH"
echo "   Add to your footer with: <img src=\"/images/$OUTPUT_FILENAME\" alt=\"Badge\" width=\"32\" height=\"32\" />"
