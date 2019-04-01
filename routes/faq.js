/*const express = require('express')
const bodyParser = require("body-parser")

const app = express.Router();
module.exports = app;
var cheerio = require('cheerio');  
var request = require('request');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send("챗봇");
});

//버튼형
app.get('/keyboard', function (req, res) {
    var data = {
        "type" : "buttons",
        "buttons" : ["1.도움말", "2.채팅으로 시작하기", "3.시설", "4.연락처", "5.교통", "6.생활", "7.식당", "8.학사공지"]
    };
    res.json(data);
});

//채팅형
app.post('/message', function(req, res){
    var msg = req.body.content;
    
    var send = {};
    
    if (msg.search("메인") !== -1) {
            send = {
                "message" : {
                    "text": "메인으로"
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["1.도움말", "2.채팅으로 시작하기", "3.시설", "4.연락처", "5.교통", "6.생활", "7.식당", "8.학사공지"]
                }
            }
        }
    else if (msg.search("도움") !== -1) {
            send = {
                "message" : {
                    "text": "삼삼이는 삼육대학생과 지역사회를 위해 삼육대학교 멋쟁이 사자처럼에서 제작한 챗봇입니다.\n버튼을 눌러 선택하는 FAQ형과 키워드 중심의 채팅으로 검색하는 API형 모두 이용 가능합니다.\n현재 기능은 뭐뭐있고 뭐뭐추가 예정입니다.\n개선을 원하는 부분은 1:1 채팅이나 어디로 연락주시기 바랍니다."
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
    else if (msg.search("채팅") !== -1) {
            send = {
                "message" : {
                    "text": "필요한 내용을 말해주세요."
                }
            }
        }
        
//시설
    else if (msg.search("3.시설") !== -1) {
            send = {
                "message" : {
                    "text": "시설을 골라주세요."
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["복지시설", "편의시설"]
                }
            }
        }
    else if (msg.search("복지") !== -1) {
            send = {
                "message" : {
                    "text": "시설을 골라주세요."
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["휴게실", "보건실"]
                }
            }
        }
    else if (msg.search("휴게실") !== -1) {
            send = {
                "message" : {
                    "text": "여학생 휴게실\n위치: 학생회관 1층\n운영시간:\n월~목요일 09:00~17:00\n금요일 09:00~14:30\n문의: 02-3399-3221\n\n남학생 휴게실\n위치: 학생회관 2층\n운영시간:\n월~목요일 09:00~18:00\n금요일 09:00~14:00\n문의: 02-3399-3221"
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
    else if (msg.search("보건실") !== -1) {
            send = {
                "message" : {
                    "text": "보건실\n위치: 체육문화센터 1층 로비\n운영시간:\n월~목요일 09:00~21:00\n금요일 09:00~15:30\n문의: 02-3399-3182"
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
    else if (msg.search("편의시설") !== -1) {
            send = {
                "message" : {
                    "text": "시설을 골라주세요."
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["편의점", "제과점", "문구점", "서점", "은행", "우체국"]
                }
            }
        }
    else if (msg.search("편의점") !== -1) {
            send = {
                "message" : {
                    "text": "편의점(CU)\n위치: 학생회관 1층(파인하우스 내)\n운영시간:\n월~목요일: 08:00~21:00\n금요일: 08:00~16:00\n일요일: 08:00~19:30\n문의: 02-973-7631"
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
   else if (msg.search("제과점") !== -1) {
            send = {
                "message" : {
                    "text": "제과점(뚜레쥬르)\n위치: 바울관 지하 1층\n운영시간:\n월~목요일: 08:00~21:00\n금요일: 08:00~16:00\n일요일: 08:00~19:30\n문의: 02-3399-3412"
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
   else if (msg.search("문구점") !== -1) {
            send = {
                "message" : {
                    "text": "문구점\n위치: 바울관 지하 1층\n운영시간:\n월~목요일: 06:00~20:00\n금요일: 06:00~16:00\n문의: 02-3399-3094"
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
   else if (msg.search("서점") !== -1) {
            send = {
                "message" : {
                    "text": "서점\n위치: 바울관 지하 1층\n운영시간:\n월~목요일: 09:00~19:00\n금요일: 09:00~15:00\n문의: 02-3399-3406"
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
   else if (msg.search("은행") !== -1) {
            send = {
                "message" : {
                    "text": "은행(우리은행)\n위치: 도서관 1층\n운영시간:\n월~목요일: 09:30~16:30\n금요일: 09:30~16:30\n문의: 02-3399-3413"
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
   else if (msg.search("우체국") !== -1) {
            send = {
                "message" : {
                    "text": "우체국\n위치: 제3과학관 지하1층\n운영시간:\n월~목요일: 09:30~16:30\n금요일: 09:30~16:30\n문의: 02-3399-3418"
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
        
//연락처
    else if (msg.search("연락처") !== -1) {
            send = {
                "message" : {
                    "text": "삼육대 대표 전화번호입니다.",
                    "photo": {
                        "url": "https://i.imgur.com/zRhnEXK.png",
                        "width": 640,
                        "height": 1440
                    }
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
        
//교통
    else if (msg.search("5.교통") !== -1) {
            send = {
                "message" : {
                    "text": "이용할 방법을 선택해주세요."
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["자가용", "대중교통", "셔틀버스"]
                }
            }
        }
    else if (msg.search("자가용") !== -1) {
            send = {
                "message" : {
                    "text": "자가용으로 오는 방법입니다.",
                    "photo": {
                        "url": "https://i.imgur.com/6KeGhhH.png",
                        "width": 640,
                        "height": 300
                    }
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
    else if (msg.search("대중교통") !== -1) {
            send = {
                "message" : {
                    "text": "대중교통으로 오는 방법입니다.",
                    "photo": {
                        "url": "https://i.imgur.com/kCONXmn.png",
                        "width": 640,
                        "height": 480
                    }
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
    else if (msg.search("셔틀") !== -1) {
            send = {
                "message" : {
                    "text": "셔틀버스로 오는 방법입니다.",
                    "photo": {
                        "url": "https://i.imgur.com/2ZPbiHn.png",
                        "width": 640,
                        "height": 1440
                    }
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
        
//생활
    else if (msg.search("생활") !== -1) {
            send = {
                "message" : {
                    "text": "메뉴를 선택해주세요."
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["동아리", "날씨", "미세먼지"]
                }
            }
        }
    else if (msg.search("동아리") !== -1) {
            send = {
                "message" : {
                    "text": "삼육대학교 동아리 정보입니다.",
                    "photo": {
                        "url": "https://i.imgur.com/A0lNWGL.jpg",
                        "width": 640,
                        "height": 1440
                    }
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
        else if (msg.search("날씨") !== -1) {
            
            var url = 'https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EA%B3%B5%EB%A6%89%EB%8F%99+%EB%82%A0%EC%94%A8';  
                request(url, function(error, response, html){  
                if (error) {throw error};
                var $ = cheerio.load(html);
                $('.today_area .info_temperature .todaytemp').each(function(){
                    global.weather = $(this).text();
                    })
                });
                
            send = {
                "message" : {
                    "text": "현재 온도: "+global.weather+"℃\n값이 나오지 않으면 잠시 후 다시 시도해주세요."
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
        else if (msg.search("미세먼지") !== -1) {
            
            var url = 'https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EA%B3%B5%EB%A6%89%EB%8F%99+%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80';  
                request(url, function(error, response, html){  
                if (error) {throw error};
                var $ = cheerio.load(html);
                $('.main_figure').each(function(){
                    global.dust = $(this).text();
                    })
                });
                
            send = {
                "message" : {
                    "text": "현재 상태: "+global.dust+"㎍/㎥\n값이 나오지 않으면 잠시 후 다시 시도해주세요."
                    },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
        
//식당
    else if (msg.search("식당") !== -1) {
            send = {
                "message" : {
                    "text": "메뉴를 선택해주세요."
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["파인하우스", "프랜들리", "후문"]
                }
            }
        }
    else if (msg.search("파인") !== -1) {
            send = {
                "message" : {
                    "text": "파인하우스\n위치: 학생회관 1층\n운영시간:\n월~목요일: 08:30~19:30\n금요일: 08:30~15:00\n일요일: 09:00~15:00\n휴게시간: 월~목 15:00~16:00\n문의: 02-3399-3400",
                    "photo": {
                        "url": "https://i.imgur.com/R5CYpnC.png",
                        "width": 640,
                        "height": 1440
                    }
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
    else if (msg.search("프랜들리") !== -1) {
            send = {
                "message" : {
                    "text": "프랜들리\n채식 뷔페. 1인 5000원\n위치: 바울관 지하 1층\n운영시간:\n월~목요일: 11:30~14:00\n금요일: 11:30~14:00\n문의: 02-3399-3401"
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
    else if (msg.search("후문") !== -1) {
            send = {
                "message" : {
                    "text": "후문 식당\n삼육대학교에서 가까운 순. 가격, 대표메뉴 정도 추가 예정\n\n중국관: 중국음식\n홍원: 중식\n꿈꾸는 떡볶이: 분식\n모아밀터: 분식\n하늘지기: 한식\n지지고: 볶음밥\n명랑핫도그: 핫도그\n더큰도시락: 도시락\n하나돌: 부대찌개, 두루치기\n마녀떡볶이: 분식\n쇼쿠요쿠: 일식\n맛차이나: 중국 가정식\n도로시 화덕 피자: 피자\n정안식당: 한식\n청와삼대: 한식\n밥은: 한식\n리또기로스: 브리또\n맘스터치: 햄버거, 치킨\n후라이드참잘하는집: 치킨\n세상만사 감자탕: 감자탕, 뼈해장국\n곽만근 갈비탕: 갈비탕\n최고집 칼국수: 칼국수, 해물찜"
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
        
//학사공지
        else if (msg.search("학사공지") !== -1) {
            
            var url = 'https://new.syu.ac.kr/academic/academic-notice/#;';  
                request(url, function(error, response, html){  
                if (error) {throw error};
                var $ = cheerio.load(html);
                $('.tit').each(function(){
                    global.hskj = $(this).text();
                    })
                });
                
            send = {
                "message" : {
                    "text": "최근 글: "+global.hskj+"\n값이 나오지 않으면 잠시 후 다시 시도해주세요."
                    },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
        
//디폴트
    else  {
        console.log("받은 메시지: " + msg);
            send = {
                "message" : {
                    "text": "구현되지 않은 명령입니다. \n키워드로 검색해주세요."
                }
            }
        }
    res.json(send);
});*/