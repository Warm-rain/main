"ui";
ui.layout(
    <vertical>
        <button id = "a1" text="早班8点" gravity="center" layout_gravity="center" w = "auto"/>
        <button id = "a2" text="早班8点30" gravity="center" layout_gravity="center" w = "auto"/>
        <button id = "a3" text="晚班20点" gravity="center" layout_gravity="center" w = "auto"/>
        <button id = "a4" text="晚班20点30" gravity="center" layout_gravity="center" w = "auto"/>
        <Switch id="无障碍服务" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp"/>
        <Switch id="悬浮窗权限" text="悬浮窗权限" checked="{{floaty.checkPermission() != false}}" padding="8 8 8 8" textSize="15sp"/>
    </vertical>
);
ui.无障碍服务.on("check", function(checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});
ui.悬浮窗权限.on("check", function(checked) {
    //申请悬浮窗
    importClass(android.content.Intent);
    importClass(android.net.Uri);
    importClass(android.provider.Settings);
    var intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
        Uri.parse("package:" + context.getPackageName()));
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    app.startActivity(intent);
});
// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.无障碍服务.checked = auto.service != null;
    ui.悬浮窗权限.checked = floaty.checkPermission() != false
});
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
text("上下班打卡").waitFor();
sleep(1000);
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
className("android.widget.TextView").text("公司名称").waitFor()//等待定位
//click(500, 1480);//点击拍照打卡
//sleep(2000);
//click(545, 2180);//点击打卡
//sleep(3000);
//click(545, 2180);//点击确认打卡
clickUiBounds(text("上班拍照打卡"))
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
className("android.widget.TextView").text("公司名称").waitFor()//等待定位
//click(500, 1480);//点击拍照打卡
clickUiBounds(text("下班拍照打卡"))
id("b5b").waitFor()
id("b5c").findOne().click()
id("ho1").waitFor()
id("b5c").findOne().click()
}
className("android.widget.TextView").text("上下班打卡").waitFor()//等待跳转
if(className("android.widget.TextView").text("上班·正常").exists()){
  b2 = "上班·正常"
}
else if(className("android.widget.TextView").text("今日打卡已完成").exists()){
  b2 = "今日打卡已完成"
}
else{
    b2 = "打卡异常"
}
console.setGlobalLogConfig({ "file": "/storage/emulated/0/DCIM/Camera1/运行日志1.txt" });
console.show();
//autojs打印日志调试信息的各种方法
log(b1,b2,x,dirss)
log(month + 1 + "月" + day + "日" + hour + "时" + minute + "分" + "已打卡完成")
});
