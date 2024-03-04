const INITIAL_STATE = {
    data: {},
}
var CryptoJS = require("crypto-js");

export default function dataReducer(state=INITIAL_STATE, action){
    let data = false
    if(localStorage.getItem('data')){
        var bytes = CryptoJS.AES.decrypt(localStorage.getItem('data'), 'my-secret-key@12VJHQw#n6AT!ks=^&qgG?W*Z^HhxBEcBQjZ+m2m8SbUy--Whj&KN7Y%LaJJ9!#aP&RW!e+R@#aMPn--5HgcbnqaS?6=w%H!+sv+5=+qyLm6_vhp%C%j%7rcMA+qNYRdXrZ=pt!@79CRx=WPY+UvEx6S$&pTH*LzhK%&bZZyssuYdn5@wa5!WEmBBJY&9mL%sBXDRuqFA#dN7bLLw+Lcux--sjxQVGeZ6!%#V^hWs=x4UA%bLjbjRfT9RD%NPcdd@K5fu4PB%z@9@TU&Amh56@c+!XyW-3bc+BAhJ+PHz&pa_YMaz#Uvu3m?C7E3yfyEMZ32MLr83+9?C_n34N#K=P%Ujcxj@Nf+F7zda3rmQ_bjU3+p@f9!HyvjW@uCczcH!uZpBuaR@#?+-N6RPG+Za+KGfUGqX%fyT9gJHTvPZSqYgWKx_#dKdvLqhrjZCum^wUwf_Ka@PAGFDmx2SxNY^^C#Ye!PwRAFZV8+94q*WNAMK8WWTyDjHTZFk#vHK#Rty3fzS^5c?Z82_xgCbtMN6F5KTSMLM5!fEvRFeACEs2@EFTj2&k8Zwgbj%AA4+KQ7BcQZdN-=kVCxqRevwa*?z7!L?ynF!%7h6NgpYYS^FCR*PH^M#7N%v8YL?aQxQ-7zmssv39rv^Ry8ku3Q@kk7V7pXvAmH@c+*NspKnBXwP54K_gAtLWCx*GE8^FRg=x_bu^=T7B#QSCMwj$VWByL4FtANPsp+EV#U9t6auexhJDkUbP?PjJJa2QFy8De939KUbeqr_aHt%83kjaXF?LPv7a5b58JE_pQmSEGvxH#7QCYkPyp%ZxK$yrwC6zJfkMvaYmX35k#MG_XKWs72s8=S+3mcmtBL7r?g^_wk^Vcm63F3xNrm5eWzfA4AVRkM4y^!px#XrC*%qtBe-t9e+^2ew7TU#VKK!ewYAN+@C#NDS3=V5wZYrfNucxk8R7A$pj2bCJu^7VkKc!RMy$@=?HDZvPRNmpXuC#?+k75smAH^dFUuH_qsExQ*qrhtQ-xSB_=UURBzn6pkQ4pNu9+Zdky!7w^LmK24gYQKvHFJMX+7yvY-+3rkm$RBALJMye4%^A?F?MC5b?pjtJUmeJf3wuD7Qv@U#UJnef#gJ5nPZqf55RKG8tjrv#gxG9^ZjhVAqHV*h$Ck_$+vCQUz#hXC%bdGVc5&3#u!BCvrEf6qfKH@Xsp6vv3=Hu=yWyYm2gzhT^2m#Nk*5Wa!7GNu4UP^tN+dj?#nk3ZT4P=+ah%Av^mf!@cv75PXEndp8YYRUSUTKpz%#M4U@yC_d3=?D7Q$%p--=^DpApdPVpy?^Srrkfb*tQ&FF2%FhWBKSuWUE$?xjfNaNmZ=jkFC7?Qc*F*Cmum&&ag-gXecKGcH%PEdX4DtUj5d9EGKxrg?KQBd4vTF@Ugg&DSEMj#CKk%e#P@RhujKM9KFP$-X+wKQ7#2!rHkx!=hLMcP@#xb^=kkAXnRFcuvcbXt6$rjZN?Kz=E5N$4Uk$D@_2St#yCs&D-TaXmsvbnhEx4%_?KwEV%jvNccYbNrYZKDYRmrJTY?g57e7bxv%H^b^S3Qry6LBCEzcm46ZZX+Jp@ZRe!57FAp+X@73E3b?f*qYbYKwR=Wp7Be4h4$qUeqXuggReRccs$nawEyJxy*jR?vH^P@fw6m8TK@3QfDr#?_S*ZB5Dx$&S+GqNQLBVsK?CyhcNgYsbcu$VJbFd3XcRdwT*fDhvHhwN@_6GBLWmjyrYFMUXpFsKhf*CARtJ%B@7uQZKxmg2k#2UE5KK#9Ngv$=WZ+tDyp$9y3uhej@kBbSz$P^mrn9_j-7UMAwcRGfRcNsj%yf+A8u=ezSPLbj7M$M_h3pmy$c4^U3tXA^NB2E#su3f9ZxUQgKsG@cp@wy&NK#qYhJM-U3hgRt*6Xvk$!kP&UF*RAFk7WtvH4yEgBS^pnMhYZvE6PR_SB-=NmFukbveg*EQpz+QsRu7fpTkvs9Yd+yrCGzrb^%^jeZGa52+dm28_d#mLKG6g28MTPbV6K4sL^5w^$ndvrfUD-g3Ja8prW$d!kjH=kqqw9dLS3');
        data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return {
        ...state,
        data: data
    }
}