<?php
error_reporting(E_ALL);
include '/home/prashant/public/connect_special.php';

$q = "select entry_id, ext_id, link_id, price_added, price_seen from ankit_bidon.`link_user` WHERE toSend='1'";

$a = mysql_query($q);

while($arr = mysql_fetch_array($a)){
  $entry_id = $arr['entry_id'];
  $ext_id = $arr['ext_id'];
  $link_id = $arr['link_id'];
  $pr_added = $arr['price_added'];
  $pr_last = $arr['price_seen'];
  echo $ext_id;

  //$se = "select email from ankit_bidon.`extName` where ext_id='$ext_id' AND isVerified='1'";
  $se = "select email, isVerified from ankit_bidon.`extName` where ext_id='$ext_id'";
  $ase = mysql_query($se);

  if($arr2 = mysql_fetch_array($ase)){
    $email = $arr2['email'];
    $isVerified = $arr2['isVerified'];
    echo $email;
    if($email!=""){
     $se2 = "select link, prod, cur_price, image, position from ankit_bidon.`ext_links` where link_id='$link_id'";
     $ase2 = mysql_query($se2);
     if($arr3 = mysql_fetch_array($ase2)){
      $link = $arr3['link'];
      $prod = $arr3['prod'];
      $cur_price = $arr3['cur_price'];
      $image = $arr3['image'];

      $diff = $pr_last - $cur_price;
      echo $diff;
  $diff2 = $pr_added - $cur_price;
      $prod_link = explode(' ', $prod);
      $prod_link = implode('-', $prod_link);
      switch ($arr3['position']) {
        case 2:
          $img_portal = "http://compare.buyhatke.com/images/half/flipkart.jpg";
          break;
        case 3:
          $img_portal = "http://compare.buyhatke.com/images/half/snapdeal.jpg";
          break;
        case 4:
          $img_portal = "http://compare.buyhatke.com/images/half/shopclues.jpg";
          break;
        case 5:
          $img_portal = "http://compare.buyhatke.com/images/half/amazon.in.jpg";
          break;
        case 8:
          $img_portal = "http://compare.buyhatke.com/images/half/infibeam.jpg";
          break;
        case 9:
          $img_portal = "http://compare.buyhatke.com/images/half/jabong.jpg";
          break;
        case 7:
          $img_portal = "http://compare.buyhatke.com/images/half/myntra.jpg";
          break;
        case 12:
          $img_portal = "http://compare.buyhatke.com/images/half/homeshop18.jpg";
          break;
        case 11:
          $img_portal = "http://compare.buyhatke.com/images/half/yebhi.jpg";
          break;
        case 10:
          $img_portal = "http://compare.buyhatke.com/images/half/croma.jpg";
          break;
        case 6:
          $img_portal = "http://compare.buyhatke.com/images/half/tradus.jpg";
          break;
      }
      if($arr3['position']==2){
        $link = $link."&affid=buyhatkegm";
      }
      else if($arr3['position']==5){
        if(count(explode('?', $link))>1){
          $link = $link."&tag=buyhatke-21";
        }
        else {
          $link = $link."?tag=buyhatke-21";
        }
      }
      else if($arr3['position']==3){
        $link = "http://jasper.go2cloud.org/aff_c?offer_id=2&aff_id=3686&source=books_portal&url=".urlencode($link);
      }
      $link = "http://compare.buyhatke.com/tracking3.php?redirect=".urlencode($link);
      $link2 = "http://compare.buyhatke.com/products/".$prod_link;
      if($diff>0&&$diff2>=10){
        echo $diff;
        $linkUnsubscribe = "http://compare.buyhatke.com/unSubscribeProd.php?email=".$email."&id2=".$link_id."&id=".$ext_id;
        $dropPer = ($diff2/$cur_price)*100;
        $dropPer = round($dropPer, 2);
    $message = "Hey,\r\n <br><br> The price for the product you were monitoring, has dropped by Rs. ".$diff2.".  <br><br> Current price of the product is Rs. ".$cur_price." \r\n <br><br><a href='$link'>Click Here to go to the deal</a><br><br><a href='$link2'>View prices for the product from other stores.</a><br><br> Help us improve by writing a feedback by simply just replying to this mail.<br>Happy Shopping :)";
$trick = "Buyhatke".$ext_id."Prashant12-9-92".$email;
    $trick = md5($trick);
    $trick = md5($trick);
    $verLink = "http://compare.buyhatke.com/priceVerify.php?ex_id=".$ext_id."&code=".$trick."&email=".$email;
    if($isVerified==0){
$verification = '<td colspan="3" height="40" width="250" bgcolor="#CC3714" style="text-align:center"><a href="'.$verLink.'" target="_blank" style="color:white;text-decoration:none;font-weight:bold;">Verify Email</a></td>';
}
else {
  $verification = '<td colspan="3" height="40" width="250" style="text-align:center"></td>';
}

   $message = <<<EOD

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Price Drop Alert</title>
</head>

<body style="margin:0; padding:0;">
<table width="100%" bgcolor="#f2f2f2" style="font-size:15px;font-family:Arial, Helvetica, sans-serif">
    <tbody>
    <tr>
        <td>
        <table width="600" align="center" valign="top">
          <tbody>
              <tr>
                  <td colspan="3">                      
                    </td>                    
                </tr>
              <tr>
                  <td colspan="1" width="202" height="60"><a href="http://compare.buyhatke.com" target="_blank">
                      <img src="http://compare.buyhatke.com/images/BH-Logo-email.png" width="202" height="60" alt="Price Drop Alert for $prod" style="display:block"/></a>
                    </td>
                    <td colspan="1" height="60">
                    </td>
                    <td colspan="1" width="150" height="60" style="font-size:10px;text-align:right">
                    </td>               
                </tr>
                <tr>
                  <td colspan="3" height="10"></td>
                </tr>
                <tr>
                  <td colspan="3">
                    <table  align="center" valign="top" bgcolor="#FFFFFF" width="580" style="border-radius:10px;color:#333">
                    <tbody>
                      <tr>
                          <td colspan="5" height="10"></td>
                        </tr>
                        <tr>
                          <td colspan="1" width="10"></td>
                          <td colspan="3">
                            <p><span style="background:white;line-height:25px">Hey,<br />
The price for the product that you were monitoring has dropped by $diff2.</span></p>
                            </td>
                            <td colspan="1" width="10"></td>
                        </tr>
                        <tr>
                          <td colspan="5" height="10"></td>
                        </tr>
                        <tr>
                          
                            <td colspan="5">
                            <table>
                                <tbody>
                                  <tr>
                                        <td colspan="1" rowspan="7" height="200" width="220" style="text-align:center">
                                        <img src="$image" alt="$prod" height="200" style="max-width:220px;vertical-align:top"/>
                                        </td>
                                    <td rowspan="1" colspan="5" style="font-size:22px;">
                                        $prod
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="1" height="50" width="100">
                                          Current Price:
                                        </td>
                                        <td width="8" colspan="1">
                                          <img src="http://compare.buyhatke.com/images/rupeeG.png" height="13" alt="Rupees"/>
                                        </td>
                                        <td colspan="1" style="font-size:18px;color:#0C3" width="65">
                                          $cur_price
                                        </td>
                                        <td width="26">
                                          <img src="http://compare.buyhatke.com/price_drop/images/Price-Drop.png" width="26" alt="Price Dropped!"  style="margin-top:7px;"/>
                                        </td>
                                        <td  colspan="1" style="font-size:22px;color:#0C3">
                                        $dropPer %
                                        
                                        </td>
                                    </tr>
                                    <tr>
                                    <td colspan="3" height="40" width="250" bgcolor="#0db2db" style="text-align:center;border-radius:5px;border-bottom:3px solid #39C;">
                              <a href="$link" target="_blank" style="color:white;text-decoration:none;font-weight:bold;display:block">Check It Now</a>
                                 </td>
                                     <td colspan="1" style="font-size:16px;text-align: right;"> at </td>
                                     <td colspan="1" style="text-align: center;">
                                     <a href="$link" target="_blank"><img src="$img_portal"></a> 
                                     </td>
                                    </tr>
                                    <tr>
                                    <tr>
                                    <td height="5"></td>
                                    </tr>
                                    $verification
                                     <td colspan="2" style="font-size:12px;text-align: right;padding-right: 35px;">
                                     <a href="$link2" target="_blank" style="text-decoration:none;color:#0db2db">View</a> prices from<br /> other stores
                                     </td>
                                    </tr>
                                </tbody>
                            </table>
                            </td>
                        </tr>
                                    <tr>
                                    <td height="15"></td>
                                    </tr>

                        <tr>
                          <td colspan="1" width="10" rowspan="1"></td>
                            <td colspan="3" style="font-size:15px;text-align:center">The of joy of saving is multiplied when your friends do it as well.<br /><br /><b><a href="http://bit.ly/1cS2gkt" style="text-decoration:none;color:#0db2db">Refer</a></b> them and also earn if they install the extension.<br /><br />
  </td>
                          <td colspan="1" width="10" rowspan="1"></td>
                        </tr>
                        <tr>
                          <td colspan="2" rowspan="1" width="200"></td>
                          <td colspan="1" height="40" width="200" 
                             bgcolor="#33CC66" style="text-align:center;border-radius:5px;border-bottom:3px solid #093;">
                              <a href="http://bit.ly/1cS2gkt" target="_blank" style="color:white;text-decoration:none;font-weight:bold;display:block;">Refer & Win</a>
                                 </td>
                            <td colspan="2" rowspan="1" width="200"></td>
                        </tr>

                        <tr>
                          <td height="30" colspan="5"></td>
                        </tr>
                    </tbody>
                    </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" height="10"></td>
                </tr>
                <tr style="font-size:12px; color:#444">
                    <td colspan="6">
                    <table>
                      <tbody>
                          <tr>
                            <td>Follow us on:</td>
                            <td></td>
                            <td width="20" style="text-align:center;">
                        <a href="http://www.facebook.com/BuyHatke" target="_blank"
                            onmouseover="window.status='Follow us at facebook';  return true;"
                            onmouseout="window.status='';  return true;">
                            <img src="http://compare.buyhatke.com/price_drop/images/fb-dark.png" width="10" height="21" border="0" alt="Follow us at facebook"></a></td>
                            <td></td>
                    <td width="20" style="text-align:center;">
                        <a href="http://twitter.com/buyhatke" target="_blank"
                            onmouseover="window.status='Follow us at Twitter';  return true;"
                            onmouseout="window.status='';  return true;">
                            <img src="http://compare.buyhatke.com/price_drop/images/tw-dark.png" width="21" height="17" border="0" alt="Follow us at Twitter"></a></td>
                            <td></td>
                    <td width="20" style="text-align:center;">
                        <a href="https://plus.google.com/113192470571608705086#113192470571608705086/posts" target="_blank"
                            onmouseover="window.status='Follow us at Google+';  return true;"
                            onmouseout="window.status='';  return true;">
                            <img src="http://compare.buyhatke.com/price_drop/images/gplus-dark.png" width="21" height="17" border="0" alt="Follow us at Google+"></a></td>
                            </tr>
                        </tbody>
                    </table>
                    </td>
                </tr>
                <tr>
                  <td colspan="3"  style="font-size:11px; color:#444">Copyright &#169; 2013 Bidon Services Private Limited. All rights reserved.
                    </td>
                </tr>
                <tr>
                    <td height="39" colspan="3" style="font-size:12px; color:#444; line-height:17px">To give a feedback, simply reply to this email and we will fix your issue within 6 hours. This email was meant for <a href="mailto:atiprashant@gmail.com" target="_blank" style="text-decoration:none;color:#0db2db">$email</a>. Unsubscribe me for this product <a href="$linkUnsubscribe" target="_blank" style="text-decoration:none;color:#0db2db">here</a>.</td>
                    <td width="1" height="39" alt=""></td>
                </tr>
                <tr>
                    <td colspan="5" height="20"></td>
                </tr>
            </tbody>
        </table>
        </td>
        </tr>    
    </tbody>
</table>
</body>
</html>


EOD;
    
    $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    $headers .= 'From: Buyhatke Price Alert<wecare@buyhatke.com>' . "\r\n";
    $headers .= 'Reply-To: wecare@buyhatke.com' . "\r\n";
    mail($email, 'Buyhatke Price Alert for '.$prod, $message, $headers);

    $message = $message."<br> Message sent to ".$email;

    mail("atiprashant@gmail.com", 'Buyhatke Price Alert for '.$prod, $message, $headers);
    echo "Mail sent to ".$email;
    }
  }
  $up = "update ankit_bidon.`link_user` set toSend='0', price_seen='$cur_price' where entry_id='$entry_id'";
  $aup = mysql_query($up);

  }
  else {
    // Use some other forms to reach to the user later
  }

}

}

?>
