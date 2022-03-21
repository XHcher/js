import ddddocr
import cv2

det = ddddocr.DdddOcr(det=True)

with open("img.png", 'rb') as f:
    image = f.read()

poses = det.detection(image)
print(poses)

im = cv2.imread("test.jpg")

for box in poses:
    x1, y1, x2, y2 = box
    im = cv2.rectangle(im, (x1, y1), (x2, y2), color=(0, 0, 255), thickness=2)

