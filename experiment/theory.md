**Problem 1**

Recursion can be applied to a problem if the problem for the given input can be expressed as dependent upon the solution of the same problem for simpler inputs. One has to hardcode the solution for some simple cases, so that this recursion does not go on endlessly. Now, the given problem of expressing a weight(W) as a sum of other weights can be expressed as the problem of choosing one weight(w) such that it is not greater than W and then solving the same problem for the remaining weight W-w. For this particular problem, the solution can be expressed easily by choosing all the possible multiples(m) of a given unit, 2^(i), iteratively for all the values of m for which m*2^(i) is less than W, and subsequently solving the same problem for the remaining weight, W-w, and for multiples of weights for higher order. So, our recursion function would be needing 2 variable, one signifying multiples of which order of weight should be used this time and other signifying remaining weight to be accrued.


**Problem 2**

Let us assume we have kept weight D on left pan. From amongst the N weights you can choose to keep some weights on left side and some weights on right side and we may not use some weights at all. Lets say we keep a total weight of w1 on left side and w2+D on right pan, then for balancing w1=w2+D.We keep track the difference between the two pans and if at any stage the difference of weights between two pans is 0 we report yes. Consider the ith weight and suppose the current difference between left pan and right pan is x. If x is 0 then yes we donot choose any weight and thus return 1.

Otherwise we have three options

**Option1:** Put the ith weight on right pan.In which case the difference between left and right pan becomes x - weight[i].

**Option2:** Put the ith weight on left pan.In which case the difference between left and right pan becomes x + weight[i].

**Option3:** Donot put the ith weight on either pan.In which case the difference between left and right pan remains x.


This gives the following **Recursive Function :**

Let F(i,x) denotes whether it is possible to obtain a difference of x using the weights

w[i],w[i+1],...,w[n-1].

Obviously, F(i,0) is 1, Otherwise

F(i,x) = F(i+1,x)||F(i+1,x-w[i])||F(i+1,x+w[i]);

F(i+1,x) corresponds to Option3.

F(i+1,x-w[i]) corresponds to Option1.

F(i+1,x+w[i]) corresponds to Option2.

