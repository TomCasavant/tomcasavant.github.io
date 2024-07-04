import os
import json
from PIL import Image
from PIL.ExifTags import TAGS
from exif import Image as ExifImage

def get_exif_data(image_path):
    try:
        with open(image_path, 'rb') as img_file:
            img = ExifImage(img_file)
        
        exif_data = {}
        if img.has_exif:
            for tag in img.list_all():
                try:
                    key = TAGS.get(tag, tag)
                    value = img.get(tag)
                    exif_data[key] = value
                except Exception as e:
                    print(f"Error reading tag {tag} from {image_path}: {e}")
        return exif_data
    except Exception as e:
        print(f"Error reading EXIF data from {image_path}: {e}")
        return {}

def format_exif_data(exif_data):
    formatted_data = {}
    print('\n\n')
    for tag, value in exif_data.items():
        print(tag, value)
        try:
            formatted_data[tag] = str(value)
        except Exception as e:
            print(f"Error formatting tag {tag} with value {value}: {e}")
    return formatted_data

def scan_images(folder):
    photos = []
    for filename in os.listdir(folder):
        if filename.lower().endswith(('jpg', 'jpeg', 'png', 'tiff')):
            image_path = os.path.join(folder, filename)
            image = Image.open(image_path)
            width, height = image.size

            exif_data = get_exif_data(image_path)
            formatted_data = format_exif_data(exif_data)

            photo_info = {
                "file": filename,
                "width": width,
                "height": height,
                **formatted_data
            }
            photos.append(photo_info)
    return photos

def generate_json_file(data, output_file):
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=4)

if __name__ == "__main__":
    current_folder = os.getcwd() + '/photos'
    photos = scan_images(current_folder)
    generate_json_file(photos, 'photos.json')
