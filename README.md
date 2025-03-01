# 프리마켓용 간단 POS기

청소년 창업동아리에서 굿즈 판매 마켓에서 사용할 목적으로 만든 간단한 POS기 입니다.
상품을 선택하고, 장바구니에 담고, 결제 및 초기화 기능을 수행할 수 있습니다.

## 🎯 **POS 시스템 UI 미리보기**
![POS 시스템 화면](https://imgur.com/a/fDnj5YU)

### 🛠 기술 스택
	•	Frontend: React, TypeScript, Tailwind CSS
	•	State Management: Context API (CartContext.tsx)
	•	Build Tool: Vite

## 주요기능 (written by chatGPT)

✅ 상품 선택 및 장바구니
	•	5×5 그리드로 상품을 선택하여 장바구니에 추가할 수 있음
	•	상품은 버튼 ID 기준으로 Unique하게 추가
	•	+ / - 버튼을 눌러 수량 조정 가능
	•	개별 상품을 삭제 버튼을 눌러 장바구니에서 제거 가능

✅ 초기화 기능
	•	“초기화” 버튼(빨강) 클릭 시 “정말 초기화하시겠습니까?” 팝업 표시
	•	확인 시 장바구니 비우기, 취소하면 기존 상태 유지

✅ 체크아웃 기능
	•	“체크아웃” 버튼(파랑) 클릭 시 총 금액 확인 및 결제 모달 표시
	•	결제 수단(현금 / 계좌이체) 선택 가능
	•	현금 선택 시 “거스름돈” 입력 필드 활성화
	•	“확인” 버튼 클릭 시 JSON 파일 다운로드 (주문 정보 저장)


#### 🔹 JSON 파일 예시 (order_1700000000000.json)
```json
{
  "seq": 1700000000000,
  "paymentMethod": "현금",
  "change": 1000,
  "items": [
    { "name": "커피", "price": 2000, "quantity": 2 },
    { "name": "샌드위치", "price": 5000, "quantity": 1 }
  ],
  "total": 9000
}
```
✅ 상품 편집 기능
	•	“상품 편집” 버튼(회색) 클릭 시 상품 정보 수정 모달 표시
	•	상품 이름과 가격을 변경 가능
  

## 🔧 설치 및 실행 방법
```sh
git clone https://github.com/your-repo/teenteen-pos-tsx.git
cd teenteen-pos-tsx
npm install
npm run dev
```
브라우저에서 http://localhost:5173 로 접속하여 실행 가능