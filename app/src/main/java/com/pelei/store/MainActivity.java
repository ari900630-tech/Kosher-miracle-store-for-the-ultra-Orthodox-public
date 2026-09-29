package com.pelei.store;
import android.app.Activity;
import android.app.admin.DevicePolicyManager;
import android.content.*;
import android.os.Bundle;
import android.provider.Settings;
import android.net.Uri;
import android.webkit.*;

public class MainActivity extends Activity {
 DevicePolicyManager dpm; ComponentName admin;
 public void onCreate(Bundle b){super.onCreate(b); dpm=(DevicePolicyManager)getSystemService(DEVICE_POLICY_SERVICE); admin=new ComponentName(this,PeleiDeviceAdminReceiver.class); WebView w=new WebView(this); w.getSettings().setJavaScriptEnabled(true); w.addJavascriptInterface(new Bridge(),"Android"); w.loadUrl("file:///android_asset/index.html"); setContentView(w);}
 public class Bridge{
 @JavascriptInterface public void enableProtection(){Intent i=new Intent(DevicePolicyManager.ACTION_ADD_DEVICE_ADMIN);i.putExtra(DevicePolicyManager.EXTRA_DEVICE_ADMIN,admin);startActivity(i);}
 @JavascriptInterface public void disableProtection(String code){if("אר יוסף לוי".equals(code)&&dpm.isAdminActive(admin)){dpm.removeActiveAdmin(admin);}}
 @JavascriptInterface public void openPhoneSettings(){startActivity(new Intent(Settings.ACTION_SETTINGS));}
 @JavascriptInterface public void openAppSettings(){startActivity(new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse("package:"+getPackageName())));}
 }
}