using Symbolics, LinearAlgebra
import Base.:+
+(a::T, b::Vector{T}) where {T <:Union{Float64,Num}}=a+b[1]
@show 2
@variables x,il1,il2,il3,il4,il5,il6,rd1,rd2,rd3,rd4,rd5,rd6,rr,rpr,v,is1,is2,is3,is4,is5,is6,Il
#x=3.0
#A=[5.1e-6+4.2e-9+0.453e-6*x 4.2e-9+0.453e-6*x  4.2e-9+0.453e-6*x  ;4.2e-9+0.453e-6*x  5.1e-6+4.2e-9+0.453e-6*x  4.2e-9+0.453e-6*x ;4.2e-9+0.453e-6*x  4.2e-9+0.453e-6*x  5.1e-6+4.2e-9+0.453e-6*x ]
 #A=[5.1+4.2e-3+0.453*x 4.2e-3+0.453*x  4.2e-3+0.453*x  4.2e-3+0.453*x ;4.2e-3+0.453*x  5.1+4.2e-3+0.453*x  4.2e-3+0.453*x 4.2e-3+0.453*x ;4.2e-3+0.453*x  4.2e-3+0.453*x  5.1+4.2e-3+0.453*x 4.2e-3+0.453*x ;4.2e-3+0.453*x  4.2e-3+0.453*x  4.2e-3+0.453*x 5.1+4.2e-3+0.453*x ]
#B=(inv(A))
#display(B);println()

b=4.2e-3+0.453*x;a=5.1+4.2e-3+0.453*x  ;λ=a-b;u=[b;b;b;b;b;b];vec=[1 1 1 1 1 1]


#AA=λ*Il+u*v
#@assert A== AA
#display(AA);println()
#= BB=(inv(AA))
display(BB);println() =#
#=  c=-b/(λ^2+λ*4*b);d=1/λ+c
m=[d c c c;c d c c;c c d c;c c c d]
display(m);println()
II=Matrix{Num}(1.0I, 4, 4)  =#

#display(den)
mm=I/λ-(u*vec)/(λ*(λ+vec*u))
#display(mm) 
 

C=[-(rd1+3.88e-3)*il1-(rr+rpr+0.453e-6*v)*Il+rd1*is1;-(rd2+3.88e-3)*il2-(rr+rpr+0.453e-6*v)*Il+rd2*is2;-(rd3+3.88e-3)*il3-(rr+rpr+0.453e-6*v)*Il+rd3*is3;-(rd4+3.88e-3)*il4-(rr+rpr+0.453e-6*v)*Il+rd4*is4;-(rd5+3.88e-3)*il5-(rr+rpr+0.453e-6*v)*Il+rd5*is5;-(rd6+3.88e-3)*il6-(rr+rpr+0.453e-6*v)*Il+rd6*is6]

#display(C)
D=mm*C
display(D) 
#= ff= ((0.0042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-0.0042 - 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (5.1042 + 0.453x)*((5.1042 + 0.453x)^2 - ((0.0042 + 0.453x)^2))) 
D1=simplify(ff, expand=true) #132.97872599999997 + 35.34758999999999x

display(D1)


D=[((-Il*(rpr + rr + 4.53e-7v) + il3*(-0.00388 - rd3) + is3*rd3)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x))) + ((-Il*(rpr + rr + 4.53e-7v) + il2*(-0.00388 - rd2) + is2*rd2)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x))) + ((-Il*(rpr + rr + 4.53e-7v) + il1*(-0.00388 - rd1) + is1*rd1)*((5.1042 + 0.453x)^2 - ((0.0042 + 0.453x)^2))), 
   ((-Il*(rpr + rr + 4.53e-7v) + il2*(-0.00388 - rd2) + is2*rd2)*((5.1042 + 0.453x)^2 - ((0.0042 + 0.453x)^2)))+((-Il*(rpr + rr + 4.53e-7v) + il3*(-0.00388 - rd3) + is3*rd3)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x))) + ((-Il*(rpr + rr + 4.53e-7v) + il1*(-0.00388 - rd1) + is1*rd1)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x))),
   ((-Il*(rpr + rr + 4.53e-7v) + il2*(-0.00388 - rd2) + is2*rd2)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x))) +((-Il*(rpr + rr + 4.53e-7v) + il3*(-0.00388 - rd3) + is3*rd3)*((5.1042 + 0.453x)^2 - ((0.0042 + 0.453x)^2)))+((-Il*(rpr + rr + 4.53e-7v) + il1*(-0.00388 - rd1) + is1*rd1)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)))] 
   
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
#= ff=(-(0.0042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)) - (-5.1042 - 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)))

D1=simplify(ff, expand=true) #132.97872599999997 + 35.34758999999999x

display(D1) =#

#= 
ff=  ((0.0042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-0.0042 - 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (5.1042 + 0.453x)*((5.1042 + 0.453x)^2 - ((0.0042 + 0.453x)^2)))
D1=simplify(ff, expand=true) #132.97872599999997 + 35.34758999999999x

display(D1) =#

#ff= ((0.0042 + 0.453x)*((0.0042 + 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-5.1042 - 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x))) + (5.1042 + 0.453x)*((0.0042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-0.0042 - 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (5.1042 + 0.453x)*((5.1042 + 0.453x)^2 - ((0.0042 + 0.453x)^2))) + (-0.0042 - 0.453x)*((0.0042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-0.0042 - 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (0.0042 + 0.453x)*((5.1042 + 0.453x)^2 - ((0.0042 + 0.453x)^2))) + (-0.0042 - 0.453x)*((0.0042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-5.1042 - 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x))))
#ff=((-Il*(rpr + rr + 4.53e-7v) + il1*(-0.00388 - rd1) + is1*rd1)*((0.0042 + 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-5.1042 - 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x))))

#ff=((0.0042 + 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-5.1042 - 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)))

#= ff=((0.0042 + 0.453x)*((0.0042 + 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-5.1042 - 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x))) + (5.1042 + 0.453x)*((0.0042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-0.0042 - 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (5.1042 + 0.453x)*((5.1042 + 0.453x)^2 - ((0.0042 + 0.453x)^2))) + (-0.0042 - 0.453x)*((0.0042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-0.0042 - 0.453x)*(-((0.0042 + 0.453x)^2) + (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (0.0042 + 0.453x)*((5.1042 + 0.453x)^2 - ((0.0042 + 0.453x)^2))) + (-0.0042 - 0.453x)*((0.0042 + 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x)) + (-5.1042 - 0.453x)*((0.0042 + 0.453x)^2 - (0.0042 + 0.453x)*(5.1042 + 0.453x))))

D1=simplify(ff, expand=true) #132.97872599999997 + 35.34758999999999x
@show D1 =#