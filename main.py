import os
import json
import pandas as pd

# JSON 파일이 있는 폴더
receipt_folder = "./receipt"
output_file = "./receipts.xlsx"

# 폴더가 없으면 새로 생성
if not os.path.exists(receipt_folder):
    os.makedirs(receipt_folder)
    print(f"📂 '{receipt_folder}' 폴더가 생성되었습니다.")

# 모든 JSON 파일 목록 가져오기
json_files = [f for f in os.listdir(receipt_folder) if f.endswith(".json")]

if not json_files:
    print("⚠️ 'receipt' 폴더에 JSON 파일이 없습니다. 파일을 추가한 후 다시 실행하세요.")
    exit()

# 데이터를 저장할 리스트
data = []

# JSON 파일을 하나씩 처리
for json_file in json_files:
    file_path = os.path.join(receipt_folder, json_file)
    
    with open(file_path, "r", encoding="utf-8") as f:
        receipt = json.load(f)
        
        # 영수증 기본 정보
        seq = receipt.get("seq", "")
        payment_method = receipt.get("paymentMethod", "")
        change = receipt.get("change", 0)
        total = receipt.get("total", 0)
        
        # 각 상품 정보 추가
        for item in receipt.get("items", []):
            data.append({
                "파일명": json_file,
                "거래번호": seq,
                "결제수단": payment_method,
                "거스름돈": change,
                "총액": total,
                "상품명": item["name"],
                "가격": item["price"],
                "수량": item["quantity"],
                "총 상품 금액": item["price"] * item["quantity"]
            })

# DataFrame 생성
df = pd.DataFrame(data)

# 엑셀 파일로 저장
df.to_excel(output_file, index=False, engine="openpyxl")

print(f"✅ 모든 JSON 데이터를 '{output_file}' 파일로 저장 완료!")