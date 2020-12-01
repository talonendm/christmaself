# christmaself
p5 game


~~~

cd git
git clone https://github.com/talonendm/christmaself.git
cd christmaself
git branch gh-pages
# Might need to do this first: git branch -D gh-pages (no need JT)
git push -u origin gh-pages # Push the new branch back to github
Go to http://talonendm.github.io/christmaself

~~~
Editing files
~~~

cd git/christmaself
git checkout gh-pages # if not selected
git status
git add . 
git commit -m "your message"
git push origin gh-pages 

~~~

test it ..

how to [clone own repo](https://stackoverflow.com/questions/10963878/how-do-you-fork-your-own-repository-on-github):
~~~
git clone https://github.com/userName/Repo New_Repo
cd New_Repo
git remote set-url origin https://github.com/userName/New_Repo
git remote add upstream https://github.com/userName/Repo
git push origin master
git push --all
~~~

~~~
git clone https://github.com/talonendm/christmaself p5gametemplate
cd p5gametemplate
git remote set-url origin https://github.com/talonendm/p5gametemplate
git remote add upstream https://github.com/talonendm/christmaself
git push origin master
git push --all
~~~


