var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var cheerio = require('cheerio');  
var request = require('request');
var schedule = require('node-schedule'); 


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send("챗봇");
});

// FAQ모드와 채팅모드 구분
var or =1;

//키보드
app.get('/keyboard', function (req, res) {
    var data = {
        "type" : "buttons",
        "buttons" : ["1.도움말", "2.채팅으로 시작하기", "3.시설", "4.연락처", "5.교통", "6.생활", "7.식당", "8.학사공지"]
    };
    or = 1;
    res.json(data);
});



// 크롤링 함수
global.gongji = "";
global.dust = "";
global.weather = "";
global.ondo = "";
global.iljung = "";

var getgongji = schedule.scheduleJob('30 * * * * *', function(){
    var url = 'https://new.syu.ac.kr/academic/academic-notice/#;';  
    request(url, function(error, response, html){  
    if (error) {throw error};
    var $ = cheerio.load(html);
    var arr = new Array;
     $('.tit').each(function(){
        arr.push($(this).text());
        })
        global.gongji = arr.join("\n\n")
    });
    return "";
})
var getdust = schedule.scheduleJob('30 * * * * *', function(){
     var url = 'https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EA%B3%B5%EB%A6%89%EB%8F%99+%EB%82%A0%EC%94%A8';  
        request(url, function(error, response, html){  
        if (error) {throw error}
        var $ = cheerio.load(html);
        $('.today_area .detail_box').each(function(){
            global.dust = $(this).text() + "\n";
            });
    });
    return "";
});

var getondo = schedule.scheduleJob('30 * * * * *', function(){
     var url = 'https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EA%B3%B5%EB%A6%89%EB%8F%99+%EB%82%A0%EC%94%A8';  
        request(url, function(error, response, html){  
        if (error) {throw error};
        var $ = cheerio.load(html);
        $('.today_area .info_temperature').each(function(){
            global.ondo = $(this).text();
            })
    })
    return "";
})
var getweather = schedule.scheduleJob('30 * * * * *', function(){
     var url = 'https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EA%B3%B5%EB%A6%89%EB%8F%99+%EB%82%A0%EC%94%A8';  
        request(url, function(error, response, html){  
        if (error) {throw error};
        var $ = cheerio.load(html);
        $('.today_area .cast_txt').each(function(){
            global.weather = $(this).text();
            })
    })
    return "";
})
var getiljung = schedule.scheduleJob('30 * * * * *', function(){
     var url = 'https://new.syu.ac.kr/academic/major-schedule/';  
        request(url, function(error, response, html){  
        if (error) {throw error};
        var $ = cheerio.load(html);
        $('.md_gray_textcalendar').each(function(){
            global.iljung = $(this).text();
            })
    })
    return "";
})

app.post('/message', function(req, res){
    var msg = req.body.content;
    var send = {};


//if문 시작
if(or == 1){
    

//
// 분기1 FAQ모드 시작


    if (msg.search("메인") !== -1) {
            or = 1;
            send = {
                "message" : {
                    "text": "메뉴를 골라주세요."
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["1.도움말", "2.채팅으로 시작하기", "3.시설", "4.연락처", "5.교통", "6.생활", "7.식당", "8.학사공지"]
                }
            }
        }
    else if (msg.search("1.도움말") !== -1) {
            send = {
                "message" : {
                    "text": "삼삼이는 삼육대학생과 지역사회를 위해 삼육대학교 멋쟁이 사자처럼에서 제작한 카카오톡 챗봇입니다.\n\n궁금하신 내용을 버튼을 눌러 선택해주시거나\n'2.채팅으로 시작하기'를 선택해 저에게 말해주세요.\n\n개선을 원하는 부분은 1:1 채팅이나 삼육대 멋쟁이사자처럼을 통해 연락주시기 바랍니다."
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
    else if (msg.search("2.채팅으로") !== -1) {
            send = {
                "message" : {
                    "text": "궁금한 내용을 저에게 물어보세요.\nFAQ모드로 이용을 원하시면 \"메인\"이라고 말해주세요."
                }
            }
            or = 0;
        }
        
//시설
    else if (msg.search("3.시설") !== -1) {
            send = {
                "message" : {
                    "text": "시설을 골라주세요."
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["1.복지시설", "2.편의시설"]
                }
            }
        }
    else if (msg.search("1.복지시설") !== -1) {
            send = {
                "message" : {
                    "text": "시설을 골라주세요."
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["1.휴게실", "2.보건실", "3.열람실"]
                }
            }
        }
    else if (msg.search("1.휴게실") !== -1) {
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
    else if (msg.search("2.보건실") !== -1) {
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
        else if (msg.search("3.열람실") !== -1) {
            send = {
                "message" : {
                    "text": "열람실\n위치: 중앙 도서관 \n운영시간:\n월~목,일요일 06:00~23:00\n금요일 06:00~16:00\n문의: 02-3399-3042",
                    "message_button": {
                            "label": "열람실 좌석 정보",
                            "url": "http://210.94.224.174/webseat/domian5.asp"
                         }
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
    else if (msg.search("2.편의시설") !== -1) {
            send = {
                "message" : {
                    "text": "시설을 골라주세요."
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["1.편의점", "2.제과점", "3.문구점", "4.서점", "5.은행", "6.우체국"]
                }
            }
        }
    else if (msg.search("1.편의점") !== -1) {
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
   else if (msg.search("2.제과점") !== -1) {
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
   else if (msg.search("3.문구점") !== -1) {
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
   else if (msg.search("4.서점") !== -1) {
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
   else if (msg.search("5.은행") !== -1) {
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
   else if (msg.search("6.우체국") !== -1) {
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
    else if (msg.search("4.연락처") !== -1) {
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
                    "buttons": ["1.자가용", "2.대중교통", "3.셔틀버스"]
                }
            }
        }
    else if (msg.search("1.자가용") !== -1) {
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
    else if (msg.search("2.대중교통") !== -1) {
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
    else if (msg.search("3.셔틀버스") !== -1) {
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
    else if (msg.search("6.생활") !== -1) {
            send = {
                "message" : {
                    "text": "메뉴를 선택해주세요."
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["1.동아리", "2.날씨", "3.미세먼지", "4.일정"]
                }
            }
        }
    else if (msg.search("1.동아리") !== -1) {
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
        else if (msg.search("2.날씨") !== -1) {
            send = {
                "message" : {
                    "text": "오늘 날씨:\n" + global.ondo + " " + global.weather + "\n\n값이 나오지 않으면 잠시 후 다시 시도해주세요."
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
        else if (msg.search("3.미세먼지") !== -1) {
            send = {
                "message" : {
                    "text": "삼육대 대기 상태:\n" + global.dust + "\n값이 나오지 않으면 잠시 후 다시 시도해주세요."
                    },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
        else if (msg.search("4.일정") !== -1) {
            send = {
                "message" : {
                    "text": "이번달 삼육대 일정:\n" + global.iljung + "\n값이 나오지 않으면 잠시 후 다시 시도해주세요."
                    },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
        
//식당
    else if (msg.search("7.식당") !== -1) {
            send = {
                "message" : {
                    "text": "메뉴를 선택해주세요."
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["1.파인하우스", "2.프랜들리", "3.후문"]
                }
            }
        }
    else if (msg.search("1.파인") !== -1) {
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
    else if (msg.search("2.프랜들리") !== -1) {
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
    else if (msg.search("3.후문") !== -1) {
            send = {
                "message" : {
                    "text": "후문 식당\n삼육대학교에서 가까운 순입니다.\n\n중국관: 중국음식\n홍원: 중식\n꿈꾸는 떡볶이: 분식\n모아밀터: 분식\n하늘지기: 한식\n지지고: 볶음밥\n명랑핫도그: 핫도그\n더큰도시락: 도시락\n하나돌: 부대찌개, 두루치기\n마녀떡볶이: 분식\n쇼쿠요쿠: 일식\n맛차이나: 중국 가정식\n도로시 화덕 피자: 피자\n정안식당: 한식\n청와삼대: 한식\n밥은: 한식\n리또기로스: 브리또\n맘스터치: 햄버거, 치킨\n후라이드참잘하는집: 치킨\n세상만사 감자탕: 감자탕, 뼈해장국\n곽만근 갈비탕: 갈비탕\n최고집 칼국수: 칼국수, 해물찜"
                },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
        
//학사공지
        else if (msg.search("8.학사공지") !== -1) {
                
            send = {
                "message" : {
                    "text": "공지 및 최근 글: \n" + global.gongji + "\n\n값이 나오지 않으면 잠시 후 다시 시도해주세요."
                    },
                keyboard: {
                    "type": "buttons",
                    "buttons": ["메인으로"]
                }
            }
        }
        else  {
        console.log("받은 메시지: " + msg);
            send = {
                "message" : {
                    "text": "예상치 못한 오류입니다.\n'메인'이라고 말해주세요."
                }
            }
        }
}
//
// FAQ모드 if문 끝



//
// 분기2 채팅모드

else {
            if (msg.search("메인") !== -1) {
                or = 1;
                send = {
                    "message" : {
                        "text": "메인으로"
                    },
                    keyboard: {
                        "type": "buttons",
                        "buttons": ["1.도움말", "2.채팅으로 시작하기", "3.시설", "4.연락처", "5.교통", "6.생활", "7.식당", "8.학사공지"]
                    }
                }
                or = 1;
            }
        
        
            else if ((msg.search("도움") !== -1) || (msg.search("이용방법") !== -1)) {
            send = {
                "message" : {
                    "text": "삼삼이는 삼육대학생과 지역사회를 위해 삼육대학교 멋쟁이 사자처럼에서 제작한 카카오톡 챗봇입니다.\n\n궁금하신 내용을 저에게 말씀해주시거나\n'메인으로' 라고 말해 FAQ모드로 이용하실 수 있어요.\n\n개선을 원하는 부분은 1:1 채팅이나 삼육대 멋쟁이사자처럼을 통해 연락주시기 바랍니다."
                }
            }
        }
        
//시설

    else if (msg.search("휴게실") !== -1) {
            send = {
                "message" : {
                    "text": "여학생 휴게실\n위치: 학생회관 1층\n운영시간:\n월~목요일 09:00~17:00\n금요일 09:00~14:30\n문의: 02-3399-3221\n\n남학생 휴게실\n위치: 학생회관 2층\n운영시간:\n월~목요일 09:00~18:00\n금요일 09:00~14:00\n문의: 02-3399-3221"
                }
            }
        }
    else if (msg.search("보건실") !== -1) {
            send = {
                "message" : {
                    "text": "보건실\n위치: 체육문화센터 1층 로비\n운영시간:\n월~목요일 09:00~21:00\n금요일 09:00~15:30\n문의: 02-3399-3182"
                }
            }
        }
        else if (msg.search("열람실") !== -1) {
            send = {
                "message" : {
                    "text": "열람실\n위치: 중앙 도서관 \n운영시간:\n월~목,일요일 06:00~23:00\n금요일 06:00~16:00\n문의: 02-3399-3042",
                    "message_button": {
                            "label": "열람실 좌석 정보",
                            "url": "http://210.94.224.174/webseat/domian5.asp"
                         }
                }
            }
        }
    else if (msg.search("편의점") !== -1) {
            send = {
                "message" : {
                    "text": "편의점(CU)\n위치: 학생회관 1층(파인하우스 내)\n운영시간:\n월~목요일: 08:00~21:00\n금요일: 08:00~16:00\n일요일: 08:00~19:30\n문의: 02-973-7631"
                }
            }
        }
   else if (msg.search("제과") !== -1) {
            send = {
                "message" : {
                    "text": "제과점(뚜레쥬르)\n위치: 바울관 지하 1층\n운영시간:\n월~목요일: 08:00~21:00\n금요일: 08:00~16:00\n일요일: 08:00~19:30\n문의: 02-3399-3412"
                }
            }
        }
   else if (msg.search("문구") !== -1) {
            send = {
                "message" : {
                    "text": "문구점\n위치: 바울관 지하 1층\n운영시간:\n월~목요일: 06:00~20:00\n금요일: 06:00~16:00\n문의: 02-3399-3094"
                }
            }
        }
   else if (msg.search("서점") !== -1) {
            send = {
                "message" : {
                    "text": "서점\n위치: 바울관 지하 1층\n운영시간:\n월~목요일: 09:00~19:00\n금요일: 09:00~15:00\n문의: 02-3399-3406"
                }
            }
        }
   else if (msg.search("은행") !== -1) {
            send = {
                "message" : {
                    "text": "은행(우리은행)\n위치: 도서관 1층\n운영시간:\n월~목요일: 09:30~16:30\n금요일: 09:30~16:30\n문의: 02-3399-3413"
                }
            }
        }
   else if (msg.search("우체국") !== -1) {
            send = {
                "message" : {
                    "text": "우체국\n위치: 제3과학관 지하1층\n운영시간:\n월~목요일: 09:30~16:30\n금요일: 09:30~16:30\n문의: 02-3399-3418"
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
                }
            }
        }
        
//교통

    else if (msg.search("자가용") !== -1) {
            send = {
                "message" : {
                    "text": "자가용으로 오는 방법입니다.",
                    "photo": {
                        "url": "https://i.imgur.com/6KeGhhH.png",
                        "width": 640,
                        "height": 300
                    }
                }
            }
        }
   else if (msg.search("버스") !== -1) {
            send = {
                "message" : {
                    "text": "대중교통과 셔틀버스 중 어떤 것을 찾으세요?"
                }
            }
        }
    else if ((msg.search("대중교통") !== -1) || (msg.search("지하철") !== -1)) {
            send = {
                "message" : {
                    "text": "대중교통으로 오는 방법입니다.\n셔틀버스 정보가 필요하시면 '셔틀'이라고 말해주세요.",
                    "photo": {
                        "url": "https://i.imgur.com/kCONXmn.png",
                        "width": 640,
                        "height": 480
                    }
                }
            }
        }
    else if ((msg.search("셔틀") !== -1) || (msg.search("스쿨버스") !== -1)) {
            send = {
                "message" : {
                    "text": "셔틀버스로 오는 방법입니다.",
                    "photo": {
                        "url": "https://i.imgur.com/2ZPbiHn.png",
                        "width": 640,
                        "height": 1440
                    }
                }
            }
        }
        
//생활
    else if (msg.search("동아리") !== -1) {
            send = {
                "message" : {
                    "text": "삼육대학교 동아리 정보입니다.",
                    "photo": {
                        "url": "https://i.imgur.com/A0lNWGL.jpg",
                        "width": 640,
                        "height": 1440
                    }
                }
            }
        }
        else if ((msg.search("날씨") !== -1) || (msg.search("온도") !== -1) || (msg.search("ㄴㅆ") !== -1)) {
            send = {
                "message" : {
                    "text": "오늘 날씨:\n" + global.ondo + " " + global.weather + "\n\n값이 나오지 않으면 잠시 후 다시 시도해주세요."
                }
            }
        }
        else if ((msg.search("미세먼지") !== -1) || (msg.search("미세") !== -1)|| (msg.search("ㅁㅅㅁㅈ") !== -1)) {
            send = {
                "message" : {
                    "text": "삼육대 대기 상태:\n" + global.dust +"\n값이 나오지 않으면 잠시 후 다시 시도해주세요."
                    }
            }
        }
        else if (msg.search("일정") !== -1) {
            send = {
                "message" : {
                    "text": "이번달 삼육대 일정:\n" + global.iljung +"\n값이 나오지 않으면 잠시 후 다시 시도해주세요."
                    }
            }
        }
        
//식당
    else if ((msg.search("식당") !== -1) || (msg.search("점심") !== -1) || (msg.search("밥") !== -1) || (msg.search("식사") !== -1)|| (msg.search("배고파") !== -1)) {
            send = {
                "message" : {
                    "text": "파인하우스, 프랜들리, 후문식당 중 어떤 식당을 찾으시나요?"
                }
            }
        }
    else if ((msg.search("파인") !== -1) || (msg.search("학식") !== -1)) {
            send = {
                "message" : {
                    "text": "파인하우스\n위치: 학생회관 1층\n운영시간:\n월~목요일: 08:30~19:30\n금요일: 08:30~15:00\n일요일: 09:00~15:00\n휴게시간: 월~목 15:00~16:00\n문의: 02-3399-3400",
                    "photo": {
                        "url": "https://i.imgur.com/R5CYpnC.png",
                        "width": 640,
                        "height": 1440
                    }
                }
            }
        }
    else if (msg.search("프랜들리") !== -1) {
            send = {
                "message" : {
                    "text": "프랜들리\n채식 뷔페. 1인 5000원\n위치: 바울관 지하 1층\n운영시간:\n월~목요일: 11:30~14:00\n금요일: 11:30~14:00\n문의: 02-3399-3401"
                }
            }
        }
    else if (msg.search("후문") !== -1) {
            send = {
                "message" : {
                    "text": "후문 식당\n삼육대학교에서 가까운 순입니다.\n\n중국관: 중국음식\n홍원: 중식\n꿈꾸는 떡볶이: 분식\n모아밀터: 분식\n하늘지기: 한식\n지지고: 볶음밥\n명랑핫도그: 핫도그\n더큰도시락: 도시락\n하나돌: 부대찌개, 두루치기\n마녀떡볶이: 분식\n쇼쿠요쿠: 일식\n맛차이나: 중국 가정식\n도로시 화덕 피자: 피자\n정안식당: 한식\n청와삼대: 한식\n밥은: 한식\n리또기로스: 브리또\n맘스터치: 햄버거, 치킨\n후라이드참잘하는집: 치킨\n세상만사 감자탕: 감자탕, 뼈해장국\n곽만근 갈비탕: 갈비탕\n최고집 칼국수: 칼국수, 해물찜"
                }
            }
        }
    else if ((msg.search("졸업") !== -1) || (msg.search("성적") !== -1) || (msg.search("수강") !== -1) || (msg.search("학점") !== -1) || (msg.search("학기") !== -1) || (msg.search("수업") !== -1) || (msg.search("강의") !== -1) || (msg.search("전공") !== -1)) {
            send = {
                "message" : {
                    "text": "자세한 학점 및 졸업 정보는 교무처를 통해 문의해주세요.\n연락처: 02-3399-3155"
                }
            }
        }
    else if ((msg.search("입결") !== -1) || (msg.search("입시") !== -1) || (msg.search("입학") !== -1)) {
            send = {
                "message" : {
                    "text": "자세한 입학 정보는 입학관리본부를 통해 문의해주세요.\n연락처: 02-3399-3364"
                }
            }
        }
    else if ((msg.search("휴학") !== -1) || (msg.search("복학") !== -1) || (msg.search("전과") !== -1) || (msg.search("재입학") !== -1)) {
            send = {
                "message" : {
                    "text": "자세한 휴,복학 정보는 학사지원팀을 통해 문의해주세요.\n연락처: 02-3399-3152"
                }
            }
        }
    else if (msg.search("장학") !== -1) {
            send = {
                "message" : {
                    "text": "자세한 장학 정보는 학생처를 통해 문의해주세요.\n연락처: 02-3399-3225"
                }
            }
        }
    else if (msg.search("등록금") !== -1) {
            send = {
                "message" : {
                    "text": "자세한 등록금 정보는 재무실을 통해 문의해주세요.\n연락처: 02-3399-3443"
                }
            }
        }
    else if ((msg.search("생활관") !== -1) || (msg.search("기숙사") !== -1)) {
            send = {
                "message" : {
                    "text": "자세한 생활관 정보는 생활교육관을 통해 문의해주세요.\n연락처: 02-3399-3667"
                }
            }
        }
    else if ((msg.search("교목처") !== -1) || (msg.search("채플") !== -1)) {
            send = {
                "message" : {
                    "text": "교목처 전화번호입니다.\n02-3399-3328"
                }
            }
        }
    else if (msg.search("교무처") !== -1) {
            send = {
                "message" : {
                    "text": "교무처 전화번호입니다.\n02-3399-3357"
                }
            }
        }        
    else if (msg.search("학생처") !== -1) {
            send = {
                "message" : {
                    "text": "학생처 전화번호입니다.\n02-3399-3221"
                }
            }
        }  
     else if (msg.search("장근청") !== -1) {
            send = {
                "message" : {
                    "text": "장근청홀은 대강당 맞은편 백주년기념관(국제교육관) 4층에 있습니다."
                }
            }
        } 
    else if (msg.search("홍명기") !== -1) {
            send = {
                "message" : {
                    "text": "홍명기홀은 요한관 지하1층에 있습니다."
                }
            }
        }  
    else if (msg.search("봉사") !== -1) {
            send = {
                "message" : {
                    "text": "사회봉사센터 전화번호입니다.\n02-3399-3262"
                }
            }
        } 
 

//학사공지
        else if (msg.search("학사공지") !== -1) {
                
            send = {
                "message" : {
                    "text": "최근 글: \n" + global.gongji + "\n\n값이 나오지 않으면 잠시 후 다시 시도해주세요."
                    }
            }
        }
        
//잡담
        else if((msg.search("안녕") !== -1) || (msg.search("ㅎㅇ") !== -1) || (msg.search("헬로") !== -1) || (msg.search("반가워") !== -1) || (msg.search("하이") !== -1)) {
            send = {
                "message" : {
                    "text": "안녕하세요. 삼삼이입니다!"
                }
            }
        }
        else if((msg.search("후원") !== -1) || (msg.search("도네") !== -1) || (msg.search("학습") !== -1)) {
            send = {
                "message" : {
                    "text": "삼삼이의 발전을 원하시면 삼육대학교 멋쟁이사자처럼을 통해 후원해주세요!"
                }
            }
        }
        else if((msg.search("멋사") !== -1) || (msg.search("멋쟁이사자처럼") !== -1) || (msg.search("멋쟁이 사자처럼") !== -1)) {
            send = {
                "message" : {
                    "text": "멋쟁이사자처럼은 컴퓨터공학 비전공자들도 프로그래밍 기초 지식을 배워 자신만의 웹서비스를 만들어 이를 통해 꿈을 실현할 수 있도록 하는 연합 동아리로 삼육대학교에서는 작년부터 시작했어요.\n\n멋사의 회원이 되고싶다면 1:1 채팅을 통해 문의주세요!"
                }
            }
        }
        else if((msg.search("고맙") !== -1) || (msg.search("ㄱㅅ") !== -1) || (msg.search("ㄳ") !== -1) || (msg.search("감사") !== -1)) {
            send = {
                "message" : {
                    "text": "별말씀을요!"
                }
            }
        }        
        else if(msg.search("심심이") !== -1) {
            send = {
                "message" : {
                    "text": "걔랑 비교하지 마세요"
                }
            }
        }
        else if(msg.search("심심") !== -1) {
            send = {
                "message" : {
                    "text": "저랑 얘기해요!"
                }
            }
        }
        else if((msg.search("피곤") !== -1) || (msg.search("힘들") !== -1)) {
            send = {
                "message" : {
                    "text": "힘내세요!"
                }
            }
        }        
        
// 채팅모드 디폴트
        else  {
        console.log("받은 메시지: " + msg);
            send = {
                "message" : {
                    "text": "아직 구현되지 않은 명령입니다.\n키워드로 검색해주세요.\n추가를 바라는 기능은 1:1 채팅을 통해 문의바랍니다.\n\n삼삼이를 학습시켜 대화를 나누고 싶다면 후원해주세요!"
                }
            }
        }

//
// 채팅모드 if문 끝

 }
       

    res.json(send);
});



app.listen(process.env.PORT, function (){
console.log("연결");
});