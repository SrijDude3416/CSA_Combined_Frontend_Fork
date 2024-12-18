#!/bin/bash

NOTEBOOKS="$(find _notebooks -name '*.ipynb')"
NOTEBOOK_COUNT=$(echo "$NOTEBOOKS" | wc -l | xargs)
CONVERTED_COUNT=0
BAR_WIDTH=30

# Detect terminal height
LINES=$(tput lines)

# Hide cursor
tput civis  

# Check for zero notebooks
if [ "$NOTEBOOK_COUNT" -eq 0 ]; then
  echo "No notebooks found to convert."
  tput cnorm  # Restore cursor
  exit 0
fi

# Iterate through each notebook and update the progress bar
for NOTEBOOK in $NOTEBOOKS; do
  CONVERTED_COUNT=$((CONVERTED_COUNT + 1))
  PROGRESS=$((CONVERTED_COUNT * 100 / NOTEBOOK_COUNT))
  FILLED_WIDTH=$((PROGRESS * BAR_WIDTH / 100))
  EMPTY_WIDTH=$((BAR_WIDTH - FILLED_WIDTH))
  BAR="$(printf "█%.0s" $(seq 1 $FILLED_WIDTH))$(printf " %.0s" $(seq 1 $EMPTY_WIDTH))"

  # Clear and update the progress display
  tput cup $((LINES-3)) 0
  printf "Converting notebook: %s\n" "$NOTEBOOK"

  tput cup $((LINES-2)) 0
  printf "Converting notebooks [%s] %3d%% | %d / %d\n" "$BAR" $PROGRESS $CONVERTED_COUNT $NOTEBOOK_COUNT
done

# Cleanup
tput cnorm  # Show cursor again
tput cup $((LINES-2)) 0
echo "All notebooks converted successfully!"
