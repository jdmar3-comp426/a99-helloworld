# API

An express server with the following endpoints:

## GET /app

---

### Parameters

No paraments.

### Returns

```
{  
    "message": string 
}
```

---

## POST /app/new

---

### Parameters

```
{  
    "user": string,
    "pass": string 
}
```

### Returns

```
{  
    "message": string 
}
```

---

## GET /app/users

---

### Parameters

No parameters.

### Returns

```
[{  
    "id": int,
    "user": string,
    "pass": string,
    "cookies" : int,
    "clickers": int
}]
```

---

## GET /app/user/:id

---

### Parameters

`id: int`

### Returns

```
{  
    "id": int,
    "user": string,
    "pass": string,
    "cookies" : int,
    "clickers": int
}
```

---

## PUT /app/update/user/:id

---

### Parameters

`id: int`

### Returns

```
{  
    "message": string 
}
```

---

## DELETE /app/delete/user/:id

---

### Parameters

`id: int`

### Returns

```
{  
    "message": string 
}
```

---

## POST /app/login

---

### Parameters

```
{  
    "user": string,
    "pass": string 
}
```

### Returns

```
[{  
    "id": int,
    "user": string,
    "pass": string,
    "cookies" : int,
    "clickers": int
}]
```

## PATCH /app/update/cookie/:id

---

### Parameters

```
{  
    "cookies" : int,
    "clickers": int
}
```

### Returns

```
{
    "message": string
}
```
