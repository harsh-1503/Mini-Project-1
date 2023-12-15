from PIL import Image

def stitch_images(image_paths, output_path):
    # Open all input images
    images = [Image.open(path) for path in image_paths]

    # Get the dimensions of the first image
    width, height = images[0].size

    # Create a new image with width equal to the sum of individual image widths
    new_width = len(images) * width
    new_image = Image.new('RGB', (new_width, height))

    # Paste each image side by side
    offset = 0
    for image in images:
        new_image.paste(image, (offset, 0))
        offset += width

    # Save the result
    new_image.save(output_path)

# Example usage
input_image_paths = [
    './images/astible.jpg',
    './images/carnation.jpg',
    './images/coreopsis.jpg',
    './images/daffodil.jpg',
    './images/dandelion.jpg',
    './images/rose.jpeg',
    './images/sunflower.jpeg',
    './images/water-lily.jpg',
    
]

output_image_path = './output_image.jpg'

stitch_images(input_image_paths, output_image_path)
