using Symbolics, LinearAlgebra

@show 2
@variables x,il1,il2,il3,il4,rd1,rd2,rd3,rd4,rr,rpr,v,is1,is2,is3,is4,I
#A=[5.1e-6+4.2e-9+0.453e-6*x 4.2e-9+0.453e-6*x  4.2e-9+0.453e-6*x  ;4.2e-9+0.453e-6*x  5.1e-6+4.2e-9+0.453e-6*x  4.2e-9+0.453e-6*x ;4.2e-9+0.453e-6*x  4.2e-9+0.453e-6*x  5.1e-6+4.2e-9+0.453e-6*x ]
#= A=[5.1+4.2e-3+0.453*x 4.2e-3+0.453*x  4.2e-3+0.453*x  4.2e-3+0.453*x ;4.2e-3+0.453*x  5.1+4.2e-3+0.453*x  4.2e-3+0.453*x 4.2e-3+0.453*x ;4.2e-3+0.453*x  4.2e-3+0.453*x  5.1+4.2e-3+0.453*x 4.2e-3+0.453*x ;4.2e-3+0.453*x  4.2e-3+0.453*x  4.2e-3+0.453*x 5.1+4.2e-3+0.453*x ]
B=(inv(A))
#display(B)



C=[-(rd1+3.88e-3)*il1-(rr+rpr+0.453e-6*v)*I+rd1*is1;-(rd2+3.88e-3)*il2-(rr+rpr+0.453e-6*v)*I+rd2*is2;-(rd3+3.88e-3)*il3-(rr+rpr+0.453e-6*v)*I+rd3*is3;-(rd4+3.88e-3)*il4-(rr+rpr+0.453e-6*v)*I+rd4*is4]

#display(C)
D=B*C
display(D) =#
#= ff= ((0.0042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-0.0042 - 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (5.1042 + 0.453x)*((5.1042 + 0.453x)^2 - ((0.0042 + 0.453x)^2))) 
D1=simplify(ff, expand=true) #132.97872599999997 + 35.34758999999999x

display(D1)


D=[((-I*(rpr + rr + 4.53e-7v) + il3*(-0.00388 - rd3) + is3*rd3)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x))) + ((-I*(rpr + rr + 4.53e-7v) + il2*(-0.00388 - rd2) + is2*rd2)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x))) + ((-I*(rpr + rr + 4.53e-7v) + il1*(-0.00388 - rd1) + is1*rd1)*((5.1042 + 0.453x)^2 - ((0.0042 + 0.453x)^2))), 
   ((-I*(rpr + rr + 4.53e-7v) + il2*(-0.00388 - rd2) + is2*rd2)*((5.1042 + 0.453x)^2 - ((0.0042 + 0.453x)^2)))+((-I*(rpr + rr + 4.53e-7v) + il3*(-0.00388 - rd3) + is3*rd3)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x))) + ((-I*(rpr + rr + 4.53e-7v) + il1*(-0.00388 - rd1) + is1*rd1)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x))),
   ((-I*(rpr + rr + 4.53e-7v) + il2*(-0.00388 - rd2) + is2*rd2)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x))) +((-I*(rpr + rr + 4.53e-7v) + il3*(-0.00388 - rd3) + is3*rd3)*((5.1042 + 0.453x)^2 - ((0.0042 + 0.453x)^2)))+((-I*(rpr + rr + 4.53e-7v) + il1*(-0.00388 - rd1) + is1*rd1)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)))] 
   
=#

#ff=((0.0042 + 0.453x)*((0.0042 + 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-5.1042 - 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x))) + (5.1042 + 0.453x)*((0.0042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-0.0042 - 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (5.1042 + 0.453x)*((5.1042 + 0.453x)^2 - ((0.0042 + 0.453x)^2))) + (-0.0042 - 0.453x)*((0.0042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-0.0042 - 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (0.0042 + 0.453x)*((5.1042 + 0.453x)^2 - ((0.0042 + 0.453x)^2))) + (-0.0042 - 0.453x)*((0.0042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-5.1042 - 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x))))
#ff=(-(0.0042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)) - (-0.0042 - 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) - (0.0042 + 0.453x)*((5.1042 + 0.453x)^2 - ((0.0042 + 0.453x)^2)))
#ff=-(-0.0042 - 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) - (5.1042 + 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x))
#ff=((0.0042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-0.0042 - 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (5.1042 + 0.453x)*((5.1042 + 0.453x)^2 - ((0.0042 + 0.453x)^2)))
#ff=((5.1042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-0.0042 - 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)))
#ff=((-0.0042 - 0.453x)*((5.1042 + 0.453x)^2 - ((0.0042 + 0.453x)^2)) + 2(0.0042 + 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)))
#ff=((0.0042 + 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (5.1042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)))
#ff=(-(0.0042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)) - (5.1042 + 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)))
#ff=((0.0042 + 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-5.1042 - 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)))
ff=(-(0.0042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)) - (-5.1042 - 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)))

D1=simplify(ff, expand=true) #132.97872599999997 + 35.34758999999999x

display(D1)




