# -*- coding: utf-8 -*-
"""
Created on Sun Feb  3 01:12:07 2019

@author: Shubham Anuraj
"""

import copy
import random
import pickle

class Node:
    def __init__(self,grid,parent,children,mm,val):
        self.grid=grid
        self.parent=parent
        self.children=children
        self.mm=mm
        self.val=val
        
class Tree:
    def __init__(self,tree):
        self.tree=tree
        
def check_win(grid,xo):
    s=""
    t=""
    u=""
    for i in range(3):
        s=s+grid[i][0]
        t=t+grid[i][1]
        u=u+grid[i][2]
        
    if s==xo*3 or t==xo*3 or u==xo*3:
        return 1
    s=""
    t=""
    u=""
    for i in range(3):
        s=s+grid[0][i]
        t=t+grid[1][i]
        u=u+grid[2][i]
        
    if s==xo*3 or t==xo*3 or u==xo*3:
        return 1
    s=""
    t=""
    for i in range(3):
        s=s+grid[i][i]
        t=t+grid[2-i][i]
    if t==xo*3 or s==xo*3:
        return 1
    
    flag=0
    for i in range(3):
        for j in range(3):
            if grid[i][j]=="-":
                flag=1
                break
        if flag==1:
            break
    if flag==1:
        return -1
    else:
        return 0.5
"""        
def min_max_tree(grid):
    tree=[]
    root=Node(grid,None,[],1,-1)
    tree.append(root)
    curr=root
    ind=0
    while True:
        print(ind)
        if ind>=len(tree):
            break
        curr=tree[ind]
        if curr.val>=0:
            ind=ind+1
            continue
        grid=curr.grid
        for i in range(3):
            for j in range(3):
                if curr.mm==1:
                    if grid[i][j]=="-":
                        grid[i][j]="X"
                        g=copy.deepcopy(grid)
                        node=Node(g,curr,[],0,check_win(g,"X"))
                        curr.children.append(node)
                        tree.append(node)
                        grid[i][j]="-"
                if curr.mm==0:
                    if grid[i][j]=="-":
                        grid[i][j]="O"
                        g=copy.deepcopy(grid)
                        v=check_win(g,"O")
                        if v==1:
                            v=0
                        node=Node(g,curr,[],1,v)
                        curr.children.append(node)
                        tree.append(node)
                        grid[i][j]="-"
        while curr!=None:
            flag=0
            if curr.mm==1:
                max=-1000
                for i in curr.children:
                    if i.val<0:
                        flag=1
                        break
                    if i.val>max:
                        max=i.val
                if flag==1:
                    break
                curr.val=max
            if curr.mm==0:
                min=1000
                for i in curr.children:
                    if i.val<0:
                        flag=1
                        break
                    if i.val<min:
                        min=i.val
                if flag==1:
                    break
                curr.val=min
            curr=curr.parent
        ind=ind+1

    return tree
"""
def print_grid(grid):
    for i in range(3):
        for j in range(3):
            print(grid[i][j],end=" ")
        print()
    print()

def play(grid,tree):
    p=0
    curr=tree[0]
    for i in range(9):
        if p%2==0:
            d={1:[],0:[],0.5:[]}
            for i in curr.children:
                d[i.val].append(i)
            flag=0
            if len(d[1])==0:
                flag=1
                if len(d[0.5])==0:
                    flag=2
            if flag==0:
                c=d[1]
            if flag==1:
                c=d[0.5]
            if flag==2:
                c=d[0]
            node=c[random.randint(0,len(c)-1)]
            grid=node.grid
            print_grid(grid)
            """
            x=int(input("Enter x:"))
            y=int(input("Enter y:"))
            grid[x][y]="X"
            v=check_win(grid,"X")
            if v==1:
                print("X wins")
                return
            print_grid(grid)
            for i in curr.children:
                if i.grid==grid:
                    curr=i
                    break
            """
            curr=node
            p=p+1
            
        else:
            d={0:[],0.5:[],1:[]}
            for i in curr.children:
                d[i.val].append(i)
            flag=0
            if len(d[0])==0:
                flag=1
                if len(d[0.5])==0:
                    flag=2
            if flag==0:
                c=d[0]
            if flag==1:
                c=d[0.5]
            if flag==2:
                c=d[1]
            node=c[random.randint(0,len(c)-1)]
            grid=node.grid
            v=check_win(grid,"O")
            if v==1:
                print("O wins")
                break
            print_grid(grid)
            curr=node
            p=p+1
    print("Draw")
    return

grid=[["-","-","-"],["-","-","-"],["-","-","-"]]

print_grid(grid)

f=open("tree.obj","rb")
t=pickle.load(f)
f.close()
tree=t.tree
play(grid,tree)