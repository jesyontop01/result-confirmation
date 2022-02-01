function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _classCallCheck(t,a){if(!(t instanceof a))throw new TypeError("Cannot call a class as a function")}var mulTable=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],shgTable=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];function processImage(t,a,e,r){if("string"==typeof t&&(t=document.getElementById(t)),t&&"naturalWidth"in t){var n=t.naturalWidth,o=t.naturalHeight;if("string"==typeof a&&(a=document.getElementById(a)),a&&"getContext"in a){a.style.width=n+"px",a.style.height=o+"px",a.width=n,a.height=o;var s=a.getContext("2d");s.clearRect(0,0,n,o),s.drawImage(t,0,0),isNaN(e)||e<1||(r?processCanvasRGBA(a,0,0,n,o,e):processCanvasRGB(a,0,0,n,o,e))}}}function getImageDataFromCanvas(t,a,e,r,n){if("string"==typeof t&&(t=document.getElementById(t)),!(t&&"object"===_typeof(t)&&"getContext"in t))throw new TypeError("Expecting canvas with `getContext` method in processCanvasRGB(A) calls!");var o=t.getContext("2d");try{return o.getImageData(a,e,r,n)}catch(t){throw new Error("unable to access image data: "+t)}}function processCanvasRGBA(t,a,e,r,n,o){if(!(isNaN(o)||o<1)){o|=0;var s=getImageDataFromCanvas(t,a,e,r,n);s=processImageDataRGBA(s,a,e,r,n,o),t.getContext("2d").putImageData(s,a,e)}}function processImageDataRGBA(t,a,e,r,n,o){var s,g,c,l,i,f,u,m,b,p,x,y,h,v,B,C,d,I,R,G,w,D,S,A,k,T=t.data,E=2*o+1,N=r-1,_=n-1,F=o+1,W=F*(F+1)/2,j=new BlurStack,H=j;for(c=1;c<E;c++)H=H.next=new BlurStack,c===F&&(k=H);H.next=j;var q=null,z=null;u=f=0;var J=mulTable[o],K=shgTable[o];for(g=0;g<n;g++){for(C=d=I=R=m=b=p=x=0,y=F*(G=T[f]),h=F*(w=T[f+1]),v=F*(D=T[f+2]),B=F*(S=T[f+3]),m+=W*G,b+=W*w,p+=W*D,x+=W*S,H=j,c=0;c<F;c++)H.r=G,H.g=w,H.b=D,H.a=S,H=H.next;for(c=1;c<F;c++)l=f+((N<c?N:c)<<2),m+=(H.r=G=T[l])*(A=F-c),b+=(H.g=w=T[l+1])*A,p+=(H.b=D=T[l+2])*A,x+=(H.a=S=T[l+3])*A,C+=G,d+=w,I+=D,R+=S,H=H.next;for(q=j,z=k,s=0;s<r;s++)T[f+3]=S=x*J>>K,0!==S?(S=255/S,T[f]=(m*J>>K)*S,T[f+1]=(b*J>>K)*S,T[f+2]=(p*J>>K)*S):T[f]=T[f+1]=T[f+2]=0,m-=y,b-=h,p-=v,x-=B,y-=q.r,h-=q.g,v-=q.b,B-=q.a,l=u+((l=s+o+1)<N?l:N)<<2,m+=C+=q.r=T[l],b+=d+=q.g=T[l+1],p+=I+=q.b=T[l+2],x+=R+=q.a=T[l+3],q=q.next,y+=G=z.r,h+=w=z.g,v+=D=z.b,B+=S=z.a,C-=G,d-=w,I-=D,R-=S,z=z.next,f+=4;u+=r}for(s=0;s<r;s++){for(d=I=R=C=b=p=x=m=0,y=F*(G=T[f=s<<2]),h=F*(w=T[f+1]),v=F*(D=T[f+2]),B=F*(S=T[f+3]),m+=W*G,b+=W*w,p+=W*D,x+=W*S,H=j,c=0;c<F;c++)H.r=G,H.g=w,H.b=D,H.a=S,H=H.next;for(i=r,c=1;c<=o;c++)f=i+s<<2,m+=(H.r=G=T[f])*(A=F-c),b+=(H.g=w=T[f+1])*A,p+=(H.b=D=T[f+2])*A,x+=(H.a=S=T[f+3])*A,C+=G,d+=w,I+=D,R+=S,H=H.next,c<_&&(i+=r);for(f=s,q=j,z=k,g=0;g<n;g++)T[(l=f<<2)+3]=S=x*J>>K,S>0?(S=255/S,T[l]=(m*J>>K)*S,T[l+1]=(b*J>>K)*S,T[l+2]=(p*J>>K)*S):T[l]=T[l+1]=T[l+2]=0,m-=y,b-=h,p-=v,x-=B,y-=q.r,h-=q.g,v-=q.b,B-=q.a,l=s+((l=g+F)<_?l:_)*r<<2,m+=C+=q.r=T[l],b+=d+=q.g=T[l+1],p+=I+=q.b=T[l+2],x+=R+=q.a=T[l+3],q=q.next,y+=G=z.r,h+=w=z.g,v+=D=z.b,B+=S=z.a,C-=G,d-=w,I-=D,R-=S,z=z.next,f+=r}return t}function processCanvasRGB(t,a,e,r,n,o){if(!(isNaN(o)||o<1)){o|=0;var s=getImageDataFromCanvas(t,a,e,r,n);s=processImageDataRGB(s,a,e,r,n,o),t.getContext("2d").putImageData(s,a,e)}}function processImageDataRGB(t,a,e,r,n,o){var s,g,c,l,i,f,u,m,b,p,x,y,h,v,B,C,d,I,R,G,w,D=t.data,S=2*o+1,A=r-1,k=n-1,T=o+1,E=T*(T+1)/2,N=new BlurStack,_=N;for(c=1;c<S;c++)_=_.next=new BlurStack,c===T&&(w=_);_.next=N;var F=null,W=null;u=f=0;var j=mulTable[o],H=shgTable[o];for(g=0;g<n;g++){for(v=B=C=m=b=p=0,x=T*(d=D[f]),y=T*(I=D[f+1]),h=T*(R=D[f+2]),m+=E*d,b+=E*I,p+=E*R,_=N,c=0;c<T;c++)_.r=d,_.g=I,_.b=R,_=_.next;for(c=1;c<T;c++)l=f+((A<c?A:c)<<2),m+=(_.r=d=D[l])*(G=T-c),b+=(_.g=I=D[l+1])*G,p+=(_.b=R=D[l+2])*G,v+=d,B+=I,C+=R,_=_.next;for(F=N,W=w,s=0;s<r;s++)D[f]=m*j>>H,D[f+1]=b*j>>H,D[f+2]=p*j>>H,m-=x,b-=y,p-=h,x-=F.r,y-=F.g,h-=F.b,l=u+((l=s+o+1)<A?l:A)<<2,m+=v+=F.r=D[l],b+=B+=F.g=D[l+1],p+=C+=F.b=D[l+2],F=F.next,x+=d=W.r,y+=I=W.g,h+=R=W.b,v-=d,B-=I,C-=R,W=W.next,f+=4;u+=r}for(s=0;s<r;s++){for(B=C=v=b=p=m=0,x=T*(d=D[f=s<<2]),y=T*(I=D[f+1]),h=T*(R=D[f+2]),m+=E*d,b+=E*I,p+=E*R,_=N,c=0;c<T;c++)_.r=d,_.g=I,_.b=R,_=_.next;for(i=r,c=1;c<=o;c++)f=i+s<<2,m+=(_.r=d=D[f])*(G=T-c),b+=(_.g=I=D[f+1])*G,p+=(_.b=R=D[f+2])*G,v+=d,B+=I,C+=R,_=_.next,c<k&&(i+=r);for(f=s,F=N,W=w,g=0;g<n;g++)D[l=f<<2]=m*j>>H,D[l+1]=b*j>>H,D[l+2]=p*j>>H,m-=x,b-=y,p-=h,x-=F.r,y-=F.g,h-=F.b,l=s+((l=g+T)<k?l:k)*r<<2,m+=v+=F.r=D[l],b+=B+=F.g=D[l+1],p+=C+=F.b=D[l+2],F=F.next,x+=d=W.r,y+=I=W.g,h+=R=W.b,v-=d,B-=I,C-=R,W=W.next,f+=r}return t}var BlurStack=function t(){_classCallCheck(this,t),this.r=0,this.g=0,this.b=0,this.a=0,this.next=null};export{BlurStack,processImage as image,processCanvasRGBA as canvasRGBA,processCanvasRGB as canvasRGB,processImageDataRGBA as imageDataRGBA,processImageDataRGB as imageDataRGB};
//# sourceMappingURL=stackblur-es.min.js.map
;