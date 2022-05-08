"ui";

ui.layout(

    <vertical>

        <button id = "a1" text="早班8点" w = "auto"/>

        <button id = "a2" text="早班8点30" w = "auto"/>

        <button id = "a3" text="晚班20点" w = "auto"/>

        <button id = "a4" text="晚班20点30" w = "auto"/>

    </vertical>

);

ui.a1.on("click", ()=> {

    var b1 = "早班8点"

    files.write("/storage/emulated/0/DCIM/Camera1/time.txt", b1);

});

ui.a2.on("click", ()=> {

    var b1 = "早班8点30"

    files.write("/storage/emulated/0/DCIM/Camera1/time.txt", b1);

});

ui.a3.on("click", ()=> {

    var b1 = "晚班20点"

    files.write("/storage/emulated/0/DCIM/Camera1/time.txt", b1);

});

ui.a4.on("click", ()=> {

    var b1 = "晚班20点30"

    files.write("/storage/emulated/0/DCIM/Camera1/time.txt", b1);

});

var dir = "/storage/emulated/0/DCIM/Camera1/"

var dircopy = "/storage/emulated/0/DCIM/Camera1/1000.bmp"

var d = new Date()

//var h = d.setHours(8) //调试时间

var hour = d.getHours()

var minute = d.getMinutes()

var month = d.getMonth()

var day = d.getDate()

function clickUiBounds(ui) {

    if (ui.exists()) {

        var a = ui.findOnce();

        if (a) {

            var b = a.bounds();

            if (b) {

                click(b.centerX(), b.centerY());

                return true;

            }

        }

    }

    return false;

}//点击ui控件

function getRndInteger(min, max) {

    return Math.floor(Math.random() * (max - min) ) + min;

}//取随机min-max的整数值

threads.start(function () {

    sleep(2000)

    var b1 = files.read("/storage/emulated/0/DCIM/Camera1/time.txt")

    if (hour > 19) {

    x = "eve";

 } else if (hour < 7) {

    x = "eve";

 } else {

    x = "mon";

 }

var dirs = files.join(dir , x)

var ev = files.listDir(dirs);

var ra = getRndInteger(0,ev.length)

var a = ev[ra]

var dirss = files.join(dirs, a)

files.copy(dirss, dircopy)

sleep(1000)

app.startActivity({packageName: "com.tencent.wework",className: "com.tencent.wework.enterprise.attendance.controller.AttendanceActivity2",root: true});//进入打卡界面

sleep(2000);

clickUiBounds(text("上下班打卡"))

//click(800, 300);

//id("k2q").findOne().click()//点击上下班打卡

sleep(1000);

//click(571, 2088);

//sleep(1000);

if(className("android.widget.TextView").text("今天不上班，好好休息").exists())

{

    while(!click("选班次打卡"));sleep(1000);

//click(517, 702);//白班

//click(517, 888);//夜班

clickUiBounds(text(b1))//选择班次

sleep(1000);

click(990, 180);//点击确定

sleep(1000);

clickUiBounds(text("上下班打卡"))

//click(800, 300);

//id("k2q").findOne().click()//点击上下班打卡

sleep(1000);

className("android.widget.TextView").text("赢合科技").waitFor()//等待定位

//click(500, 1480);//点击拍照打卡

//sleep(2000);

//click(545, 2180);//点击打卡

//sleep(3000);

//click(545, 2180);//点击确认打卡

clickUiBounds(text("下班拍照打卡"))

id("b5b").waitFor()

id("b5c").findOne().click()

id("ho1").waitFor()

id("b5c").findOne().click()

}

else{

    clickUiBounds(text("上下班打卡"))

    //click(800, 300);

    //id("k2q").findOne().click()//点击上下班打卡

sleep(1000);

className("android.widget.TextView").text("赢合科技").waitFor()//等待定位

//click(500, 1480);//点击拍照打卡

clickUiBounds(text("下班拍照打卡"))

id("b5b").waitFor()

id("b5c").findOne().click()

id("ho1").waitFor()

id("b5c").findOne().click()

}

console.setGlobalLogConfig({ "file": "/storage/emulated/0/DCIM/Camera1/运行日志1.txt" });

console.show();

//autojs打印日志调试信息的各种方法

log(b1,x,dirss)

log(month + 1 + "月" + day + "日" + hour + "时" + minute + "分" + "已打卡完成")

});
