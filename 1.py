from PIL import Image

def stitch_image(image_path, output_path):
    # Open the image
    original_image = Image.open(image_path)

    # Get the dimensions of the original image
    original_width, original_height = original_image.size

    # Create a new image with double the width
    new_width = original_width * 2
    new_image = Image.new('RGB', (new_width, original_height))

    # Paste the original image on the left side of the new image
    new_image.paste(original_image, (0, 0))

    # Paste the original image again on the right side
    new_image.paste(original_image, (original_width, 0))

    # Save the result
    new_image.save(output_path)

# Example usage
input_image_path = './garden.jpg'
output_image_path = './garden2.jpg'

stitch_image(input_image_path, output_image_path)
